const jwt = require('jsonwebtoken');
const User = require("../model/User")

const authMiddleware = async(req, res, next) => {
    try {
        // console.log(req.header('Authorization'));
        const SECRET_KEY = process.env.JWT_SECRET
        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {

            if(err){
                return res.json({success: false, message: "Invalid Token"})
            }
            const user = await User.findOne({_id: decoded.userId})
    
            if(!user){
                return res.json({success: false, message: 'User not found'})
            }
    
            req.user = user;
            next();
        });

    } catch (error) {
        res.status(401).send({ message: 'Please authenticate' });
    }
}

module.exports = authMiddleware