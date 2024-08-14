const mongoose = require("mongoose")

const HistorySchema = new mongoose.Schema({
    playerOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    playerTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    scored: {
        type: String,
        enum: ['won', 'lost', 'draw'],
        require: true,
    },
    winner: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("history", HistorySchema)