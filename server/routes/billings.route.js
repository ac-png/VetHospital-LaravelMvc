// Import express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions for billing operations
const { 
    readAll, 
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/billing.controller');

// Import middleware to check if the user is logged in
const { loginRequired } = require('../controllers/user.controller');

// Define routes for billing-related operations
router.get('/', readAll);  // Get all billing records
router.get('/:id', loginRequired, readOne);  // Get a specific billing record (requires login)
router.post('/', loginRequired, createData);  // Create a new billing record (requires login)
router.put('/:id', loginRequired, updateData);  // Update a billing record (requires login)
router.delete('/:id', loginRequired, deleteData);  // Delete a billing record (requires login)

// Export the router to be used in other parts of the app
module.exports = router;
