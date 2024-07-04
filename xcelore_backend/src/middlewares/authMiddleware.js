// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token)
    const SECRET_KEY = "YOOOOOOOOO";
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const { userId, role } = jwt.verify(token, SECRET_KEY);
        console.log(userId)
        console.log(role)
        if (role !== 'Admin') {
            return res.status(403).send('Forbidden');
        }
        req.userId = userId;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

module.exports = { isAdmin };
