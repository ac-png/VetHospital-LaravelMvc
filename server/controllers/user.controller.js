const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Role = require('../models/role.model');

// Register new user
const register = async (req, res) => {
    try {
        const { password, roleName } = req.body;
        
        // Find the role by name (e.g., Admin, Vet, Owner)
        const role = await Role.findOne({ name: roleName });
    
        if (!role) {
            // If the role doesn't exist, return an error
            return res.status(400).json({ error: 'Role not found' });
        }

        // Create a new user with hashed password
        const user = new User({
            full_name: req.body.full_name,
            password: bcrypt.hashSync(password, 8),  // Hash the password before saving
            email: req.body.email,
            role: role._id  // Assign the role to the user
        });
    
        await user.save();  // Save the user to the database
    
        return res.status(201).json(user);  // Respond with the newly created user
    } catch (err) {
        console.error('Error saving user:', err);
        return res.status(400).json({ error: err.message });  // Handle errors
    }
};

// Login user
const login = (req, res) => {
    // Find user by email
    User.findOne({ email: req.body.email })
        .then(user => {
            // If no user or password mismatch, authentication fails
            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({
                    message: 'Authentication failed. Invalid user'
                });
            }

            // Generate JWT token if authentication is successful
            return res.status(200).json({
                token: jwt.sign({
                    email: user.email,
                    full_name: user.full_name,
                    _id: user._id
                }, process.env.JWT_SECRET)  // Use secret key to sign the token
            });
        })
        .catch(err => {
            return res.status(500).json(err);  // Handle errors
        });
};

// Middleware to check if the user is authenticated
const loginRequired = (req, res, next) => {
    if (req.user) {
        next();  // Proceed if user is authenticated
    } else {
        return res.status(401).json({ message: "Unauthorised user!" });  // Respond if not authenticated
    }
};

// Export controller functions
module.exports = {
    register,
    login,
    loginRequired
};
