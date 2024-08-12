const mongoose = require("mongoose")

const HistorySchema = new mongoose.Schema({
    playerOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    playerTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    scored: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("history", HistorySchema)