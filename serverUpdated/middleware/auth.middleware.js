const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const user = await User.findById(decoded._id).populate('role');
        
        if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role.name)) {
        return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
