// Import express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions for user-related operations
const { 
    register,  // Handle user registration
    login,     // Handle user login
    loginRequired  // Middleware to check if user is logged in (not used in this file)
} = require('../controllers/user.controller');

// Define routes for user authentication
router.post('/register', register);  // Route for user registration
router.post('/login', login);  // Route for user login

// Export the router to be used in other parts of the app
module.exports = router;
