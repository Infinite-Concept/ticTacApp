const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordCode: { type: String },
    resetPasswordCodeExpires: { type: Date },
    resetPasswordToken: {type: String}
})

module.exports = mongoose.model("user", UserSchema)