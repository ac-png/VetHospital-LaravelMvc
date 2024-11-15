// Import express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions for role-related operations
const { 
    readAll, 
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/role.controller');

// Import middleware to check if the user is logged in
const { loginRequired } = require('../controllers/user.controller');

// Define routes for role-related operations
router.get('/', readAll);  // Get all roles
router.get('/:id', loginRequired, readOne);  // Get a specific role (requires login)
router.post('/', loginRequired, createData);  // Create a new role (requires login)
router.put('/:id', loginRequired, updateData);  // Update an existing role (requires login)
router.delete('/:id', loginRequired, deleteData);  // Delete a role (requires login)

// Export the router to be used in other parts of the app
module.exports = router;
