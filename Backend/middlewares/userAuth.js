const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklisttoken');
const uservalidate = async (req, res, next) => {
    try {
        const token = req.cookies.token || 
                    req.headers.authorization.split(' ')[1];
        const blacklistedToken = await blacklistTokenModel.findOne({token:token});
        
        if(blacklistedToken){
            return res.status(401).json({
                message:"You are  unauthorized"
            });
        }
        if (!token) {
            return res.status(401).json({
                message: "You are not authorized",
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET);

        const user = await userModel.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(401).json({
                message: "You are not authorized",
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = { uservalidate };
