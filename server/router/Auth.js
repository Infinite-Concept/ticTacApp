const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../model/User")
const {body, validationResult} = require("express-validator")
const tranportMailer = require("../libs/Transport")
const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middleware/Auth")

const userNameValidate = body("userName")
.trim()
.notEmpty().withMessage('Username cannot be empty')
.isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
.escape()
const emailValidate = body("email")
.notEmpty().withMessage('email cannot be empty')
.isEmail().withMessage('Invalid email format')
.normalizeEmail()
.trim()
.escape()
const passwordValidate = body("password")
.notEmpty().withMessage('password cannot be empty')
.isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
.matches(/\d/).withMessage('Password must contain a number')
.trim()
.escape()


router.post("/login", passwordValidate, emailValidate, async(req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.json({
                success: false,
                message: "Email address is not correct"})
        }

        const isMatchPwd = await bcrypt.compare(password, user.password)

        if(!isMatchPwd){
            return res.json({
                success: false,
                message: "Invalid login Credentials"})
        }

        const token = await jwt.sign({userId: user._id, userName: user.userName}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })

        const savedUser = {
            userName: user.userName,
            email: user.email
        }

        res.json({user: savedUser, token})

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
})

router.post("/register", userNameValidate, emailValidate, passwordValidate, async(req, res) => {
    try {
        console.log("hello world");
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {userName, email, password} = req.body

        const user = await User.findOne({email})

        if(user){
            return res.json({ 
                success: false,
                message: "Email already exits, proceed to login" });
        }

        const userdetails = await User.findOne({userName})

        console.log(userdetails);

        if(userdetails){
            return res.json({ 
                success: false,
                message: "User name is already used try another one.." });
        }

        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)

        if(!hashedPassword){
            return res.status(500).json({ message: "Internal server error" });
        }

        const savedUser = await User.create({
            userName,
            email,
            password: hashedPassword
        })
        
        await savedUser.save()

        let subject = "Account Successfully Created"
        let text = `
            Welcome

            You have created an account with Tic-Tac Game console 
        `

        tranportMailer(savedUser.email, subject, text)
        res.status(200).json({ 
            success: true,
            message: "Account created successfully"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
})

router.post("/forget-password", emailValidate, async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email} = req.body
  
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({ message: "Not a registered user" });
        }

        const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordCode = confirmationCode;
        user.resetPasswordCodeExpires = Date.now() + 600000

        let savedUser = await user.save()

        let subject = `Password Reset Confirmation Code`
        let text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
        + `Please copy and paste the following link, to complete the process:\n\n`
        + `Your confirmation code is: ${confirmationCode}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`

        tranportMailer(savedUser.email, subject, text)

        res.status(201).json({message: "An email has been sent to your mail, confirm and proceed with you change of password"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
})

router.post("/reset-password", async(req, res) => {
    try {

        const {confirmationCode} = req.body

        const user = await User.findOne({
            resetPasswordCode: confirmationCode,
            resetPasswordCodeExpires: {$gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({message: "Invalid or expired confirmation code"})
        }

        const resetToken = crypto.randomBytes(20).toString("hex")

        user.resetPasswordToken = resetToken.toString();
        user.resetPasswordCode = undefined
        user.resetPasswordCodeExpires= undefined
        await user.save()

        res.status(200).json({resetToken})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
})

router.post("/set-password", passwordValidate, async(req, res) => {
    try {

        const {resetToken, newPassword} = req.body

        const user = await User.findOne({resetPasswordToken: resetToken})

        if(!user){
            return res.status(400).json({message: "Invalid or expired reset token"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword
        user.resetPasswordToken = undefined
        
        await user.save()

        res.status(200).json({message: "Password updated successfully"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
})

router.get("/auth-user", authMiddleware, async (req, res) => {
    try {

        const user = req.user;
        res.json({success: true, user})
        
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

module.exports = router