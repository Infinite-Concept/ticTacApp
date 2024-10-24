
const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const Auth = require('./router/Auth');
const History = require('./router/History');
const User = require('./model/User');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

mongoose.connect('mongodb://localhost:27017/ticTac')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Unable to connect to MongoDB', err);
  });

app.use('/auth', Auth);
app.use('/history', History);

// WebSocket server setup
const wss = new WebSocket.Server({ server });
let onlineUsers = {};
let pendingInvitations = {};
let activeGames = {}; 

wss.on('connection', async (socket) => {
  console.log('A new WebSocket client connected');

  socket.send('Hello from WebSocket server');

  socket.on('message', async (message) => {
    try {
        const data = JSON.parse(message);
        const { userId, type, toUser, position, gameId } = data;

        if(type === 'inviteToGame'){
          handleGameInvitation(userId, toUser);
        }else if (type === 'acceptInvite') {
          handleAcceptInvite(userId, toUser);
        } else if (type === 'declineInvite') {
          handleDeclineInvite(userId, toUser);
        }else if (type === 'makeMove') {
          handleGameMove(userId, position, gameId);
        }else{
          const user = await User.findById(userId).select('userName inGame');
          console.log(userId);
          
          if(user){
              onlineUsers[userId] = { socket, userName: user.userName, inGame: user.inGame };
              broadcastOnlineUsers();
          }else {
              console.log(`User not found: ${userId}`);
          }
        }
    } catch (error) {
        console.error('Error processing message', error);
    }
  });

  socket.on('close', () => {
    let disconnectedUserId = null;
    
    for (const userId in onlineUsers) {
      if (onlineUsers[userId].socket === socket) {
        disconnectedUserId = userId;
        delete onlineUsers[userId];
        break;
      }
    }
  
    if (disconnectedUserId) {
      delete pendingInvitations[disconnectedUserId]; // Remove pending invitations for disconnected users
    }
  
    broadcastOnlineUsers();
  });
  

  function handleGameInvitation(fromUser, toUser) {
    if (onlineUsers[toUser]) {
      const { userName } = onlineUsers[fromUser];
      
      // Send invitation to the recipient
      onlineUsers[toUser].socket.send(JSON.stringify({
        type: 'gameInvitation',
        fromUser,
        userName,
      }));
  
      // Mark the invitation as pending
      pendingInvitations[toUser] = fromUser;
  
      // Notify the sender that the invitation is pending
      onlineUsers[fromUser].socket.send(JSON.stringify({
        type: 'invitationPending',
        toUser,
      }));
      
    } else {
      // Notify the sender that the user is not online
      onlineUsers[fromUser].socket.send(JSON.stringify({
        type: 'userOffline',
        toUser,
      }));
    }
  }
  
  function handleAcceptInvite(invitee, inviter) {
    if (pendingInvitations[invitee] === inviter) {
      const inviteeName = onlineUsers[invitee].userName;
      const inviterName = onlineUsers[inviter].userName;
      // Notify the inviter that the invitation was accepted
      onlineUsers[inviter].socket.send(JSON.stringify({
        type: 'inviteAccepted',
        invitee,
        inviteeName,
        inviterName,
      }));

      // Notify the invitee that the invitation was accepted
      onlineUsers[invitee].socket.send(JSON.stringify({
        type: 'inviteAccepted',
        inviter,
        inviteeName,
        inviterName,
      }));

      // Create a new game with an empty board and set the current turn to the inviter
      // Create a new game with a unique ID
      const gameId = `${inviter}-${invitee}`;
      activeGames[gameId] = {
        invitee,
        inviter,
        board: Array(9).fill(null), // Initialize board
        currentTurn: inviter, // Inviter goes first
      };

      // Set both users as in-game
      onlineUsers[invitee].inGame = true;
      onlineUsers[inviter].inGame = true;
      
      // Broadcast updated user list
      broadcastOnlineUsers();

      // Notify both users to start the game
      onlineUsers[inviter].socket.send(JSON.stringify({
        type: 'startGame',
        with: invitee,
        gameId,
        currentTurn: inviter,
      }));

      onlineUsers[invitee].socket.send(JSON.stringify({
        type: 'startGame',
        with: inviter,
        gameId,
        currentTurn: inviter,
      }));

      // Remove the pending invitation
      delete pendingInvitations[invitee];
    }
  }

  function handleDeclineInvite(invitee, inviter) {
    if (pendingInvitations[invitee] === inviter) {

      const inviteeName = onlineUsers[invitee].userName;
      const inviterName = onlineUsers[inviter].userName;
      // Notify the inviter that the invitation was declined
      onlineUsers[inviter].socket.send(JSON.stringify({
        type: 'inviteDeclined',
        invitee,
        inviteeName
      }));

      // Notify the invitee that they declined the invitation
      onlineUsers[invitee].socket.send(JSON.stringify({
        type: 'inviteDeclined',
        inviter,
        inviterName
      }));

      // Remove the pending invitation
      delete pendingInvitations[invitee];
    }
  }

  function handleGameMove(userId, position, gameId) {
    const game = activeGames[gameId];
  
    if (!game) return;
  
    // Validate move: check if it's the player's turn and if the position is empty
    if (game.currentTurn !== userId || game.board[position] !== null) {
      return;  // Invalid move
    }
  
    // Update the board with 'X' for inviter and 'O' for invitee
    game.board[position] = (userId === game.inviter) ? 'X' : 'O';
  
    // Check for winner or tie
    const winner = checkForWinner(game.board);
    
    // Broadcast the updated board and result to both players
    const opponent = (game.inviter !== userId) ? game.invitee : game.inviter;
    broadcastGameUpdate(gameId, position, userId, opponent, winner);
  
    // Update turn if there's no winner
    if (!winner) {
      game.currentTurn = opponent; // Switch turn
    } else {
      // If the game ends, set both users' inGame status to false
      onlineUsers[game.invitee].inGame = false;
      onlineUsers[game.inviter].inGame = false;
      
      // Broadcast updated user list
      broadcastOnlineUsers();

      // Remove the game from activeGames
      delete activeGames[gameId];
    }
  }
  
  function broadcastGameUpdate(gameId, position, playerId, opponentId, winner) {
    const game = activeGames[gameId];
    
    // Notify both players
    [playerId, opponentId].forEach(userId => {
      if (onlineUsers[userId]) {
        onlineUsers[userId].socket.send(JSON.stringify({
          type: 'gameUpdate',
          position,
          player: playerId,
          board: game.board,
          currentTurn: game.currentTurn,
          winner,  // Null if no winner yet, or 'X', 'O', or 'Tie' if game over
        }));
      }
    });
  }
  
  function checkForWinner(board) {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    // Check for winner
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];  // Return 'X' or 'O'
      }
    }
  
    // Check for tie
    if (!board.includes(null)) {
      return 'Tie';
    }
  
    return null;  // No winner or tie yet
  }  

  function broadcastOnlineUsers() {
    const onlineUserList = Object.entries(onlineUsers).map(([userId, { userName, inGame }]) => ({ userId, userName, inGame }));
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'onlineUsers', users: onlineUserList }));
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
