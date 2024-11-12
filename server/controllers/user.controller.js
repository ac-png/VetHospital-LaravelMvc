const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Role = require('../models/role.model');

const register = async (req, res) => {
    try {
        const { password, roleName } = req.body;
        const role = await Role.findOne({ name: roleName });
    
        if (!role) {
            return res.status(400).json({ error: 'Role not found' });
        }

        const user = new User({
            full_name: req.body.full_name,
            password: bcrypt.hashSync(password, 8),
            email: req.body.email,
            role: role._id
        });
    
        await user.save();
    
        return res.status(201).json(user);
    } catch (err) {
        console.error('Error saving user:', err);
        return res.status(400).json({ error: err.message });
    }
};

const login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then( user => {
            if(!user || !user.comparePassword(req.body.password)){
                return res.status(401).json({
                    message: 'Authentication failed. Invalid user'
                });
            }

            return res.status(200).json({
                token: jwt.sign({
                    email: user.email,
                    full_name: user.full_name,
                    _id: user._id
                }, process.env.JWT_SECRET)
            });
        })
        .catch(err => {
            return res.status(500).json(err);
        });
};

const loginRequired = (req, res, next) => {
    if(req.user){
        next();
    }
    else {
        return res.status(401).json({ message: "Unauthorised user!" });
    }
};

module.exports = {
    register,
    login,
    loginRequired
};