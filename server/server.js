const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const Auth = require("./router/Auth")
const History = require("./router/History")


// 790157292315-k04uadi7m7p7giugph764fcfgusljcgu.apps.googleusercontent.com

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


mongoose.connect("mongodb://localhost:27017/ticTac")
.then(() => {
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    })
})
.catch((err) => {
    console.log("unable to access database", err);
})

app.use("/auth", Auth)
app.use("/history", History)

