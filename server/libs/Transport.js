const mailer = require("nodemailer")
require("dotenv").config()

const tranportMailer = async (email, subject, text) => {

    const tranporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "ifenowoifesegun@gmail.com",
            pass: process.env.APP_PASSWORD,
        }
    })

    const mailOption = {
        from: "Traveler",
        to: email,
        subject: subject,
        text, text
    }

    try {
        await tranporter.sendMail(mailOption)
    } catch (error) {
        console.log("error sending mail", err);
    }
}

module.exports = tranportMailer

