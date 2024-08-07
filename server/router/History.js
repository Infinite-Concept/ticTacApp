const router = require("express").Router()
const History = require("../model/History")

router.get("/get-scored/:userId", async (req, res) => {
    try {

        const {userId} = req.params

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
            if (game.scored) {
              if (game.scored === 'draw') {
                draws++;
              } else if (game.scored === 'won') {
                wins++;
              } else {
                losses++;
              }
            } else {
              draws++; // Assuming no winner means a draw
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

        let history = await History.find({
            $or: [{ playerOne: userId }, { playerTwo: userId }],
        }).populate("playerOne playerTwo", "userName avatar")

        if(!history){
            return res.json({
                success: false,
                message: "Play some game."
            })
        }     

        const score = []
        history.forEach((value) => {
            let inner = {
                id: value._id,
                playerOneID: value.playerOne.id,
                playerOneName: value.playerOne.userName,
                playerTwoID: value.playerTwo.id,
                playerTwoName: value.playerTwo.userName,
                scored: value.scored,
                date: value.createdAt.toLocaleDateString()
            }
            score.push(inner)
        })

        res.json({
            success: true,
            message: score
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server Error"})
    }
})

router.post("/history", async (req, res) => {
    try {

        const {playerOne, playerTwo, scored} = req.body

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
            scored
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