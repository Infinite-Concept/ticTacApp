
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

wss.on('connection', async (socket) => {
  console.log('A new WebSocket client connected');

  socket.send('Hello from WebSocket server');

  socket.on('message', async (message) => {
    try {
        const data = JSON.parse(message);
        const { userId, type, toUser } = data;

        if(type === 'inviteToGame'){
          
          handleGameInvitation(userId, toUser);
          
        }else if (type === 'acceptInvite') {

          handleAcceptInvite(userId, toUser);

        } else if (type === 'declineInvite') {

          handleDeclineInvite(userId, toUser);

        }else{
          const user = await User.findById(userId).select('userName inGame');
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
    for (const userId in onlineUsers) {
        if (onlineUsers[userId].socket === socket) {
          delete onlineUsers[userId];
          break;
        }
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
      // Notify the inviter that the invitation was accepted
      onlineUsers[inviter].socket.send(JSON.stringify({
        type: 'inviteAccepted',
        invitee,
      }));

      // Notify the invitee that the invitation was accepted
      onlineUsers[invitee].socket.send(JSON.stringify({
        type: 'inviteAccepted',
        inviter,
      }));

      // Notify both users to start the game
      onlineUsers[inviter].socket.send(JSON.stringify({
        type: 'startGame',
        with: invitee,
      }));
      onlineUsers[invitee].socket.send(JSON.stringify({
        type: 'startGame',
        with: inviter,
      }));

      // Remove the pending invitation
      delete pendingInvitations[invitee];
    }
  }

  function handleDeclineInvite(invitee, inviter) {
    if (pendingInvitations[invitee] === inviter) {
      // Notify the inviter that the invitation was declined
      onlineUsers[inviter].socket.send(JSON.stringify({
        type: 'inviteDeclined',
        invitee,
      }));

      // Notify the invitee that they declined the invitation
      onlineUsers[invitee].socket.send(JSON.stringify({
        type: 'inviteDeclined',
        inviter,
      }));

      // Remove the pending invitation
      delete pendingInvitations[invitee];
    }
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
