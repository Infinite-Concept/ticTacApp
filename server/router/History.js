const router = require("express").Router()
const History = require("../model/History")
const mongoose = require("mongoose");

router.get("/user-stats/:userId", async (req, res) => {
    try {
        const {userId} = req.params
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        let history = await History.find({
            $or: [{ playerOne: userId }, { playerTwo: userId }],
        })

        if(!history){
            return res.json({
                success: false,
                message: "Play some game."
            })
        }

        let wins = 0;
        let draws = 0;
        let losses = 0;

        history.forEach((game) => {
            
            if (game.winner == userId) {
                wins++;
            } else if (game.scored === 'draw') {
                draws++;
            } else {
                losses++;
            }
        });

        const score = {
            wins,
            losses,
            draws,
        }

        res.json({
            success: true,
            message: score
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server Error"})
    }
})

router.get("/get-history/:userId", async (req, res) => {
    try {

        const {userId} = req.params

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        let history = await History.find({
            $or: [{ playerOne: userId }, { playerTwo: userId }],
        }).populate("playerOne playerTwo", "userName avatar")

        if(!history){
            return res.json({
                success: false,
                message: "Play some game."
            })
        }

        const games = history.map((game) => {
            return {
                id: game._id,
                opponent: game.playerOne._id.toString() === userId ? game.playerTwo.userName : game.playerOne.userName,
                outcome: game.winner
                    ? game.winner.toString() !== userId
                        ? 'won'
                        : 'lost'
                    : 'draw',
                date: game.createdAt
            };
        });

        res.json({
            success: true,
            message: games
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server Error"})
    }
})

router.get("/limit-history/:userId", async (req, res) => {
    try {

        const {userId} = req.params

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        let history = await History.find({
            $or: [{ playerOne: userId }, { playerTwo: userId }],
        }).populate("playerOne playerTwo", "userName avatar").limit(4)

        if(!history){
            return res.json({
                success: false,
                message: "Play some game."
            })
        }

        const games = history.map((game) => {
            return {
                id: game._id,
                opponent: game.playerOne._id.toString() === userId ? game.playerTwo.userName : game.playerOne.userName,
                outcome: game.winner
                    ? game.winner.toString() !== userId
                        ? 'won'
                        : 'lost'
                    : 'draw',
                date: game.createdAt
            };
        });

        res.json({
            success: true,
            message: games
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server Error"})
    }
})

router.post("/history", async (req, res) => {
    try {

        const {playerOne, playerTwo, scored, winner} = req.body

        const user = await History.findById(playerOne)
        const user2 = await History.findById(playerTwo)

        if(!user && user2){
            return res.json({
                success: false,
                message: "One or both users do not exist."
            })
        }

        const gameHistory = new History({
            playerOne,
            playerTwo,
            scored,
            winner : winner || null
        })

        await gameHistory.save();

        res.json({
            success: true,
            message: "added successfully "
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server Error"})
    }
})

module.exports = router