const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../utils/configs');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(token == null){
            return res.sendStatus(401);
        }
    
        const decoded = jwt.verify(token, getJwtSecret());
        if(!decoded){
        return res.sendStatus(403);
        }

        const user = await User.findOne({_id: decoded.id})
        req.user = user;
        next();
    } catch (error) {
        res.status(200).json(error);
        console.log(error, 'error', Object.keys(error), error.message)
    }
}

module.exports = {
    authenticateToken
}