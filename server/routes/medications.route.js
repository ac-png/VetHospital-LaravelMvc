// Import express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions for medication-related operations
const { 
    readAll, 
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/medication.controller');

// Import middleware to check if the user is logged in
const { loginRequired } = require('../controllers/user.controller');

// Define routes for medication-related operations
router.get('/', readAll);  // Get all medication records
router.get('/:id', loginRequired, readOne);  // Get a specific medication record (requires login)
router.post('/', loginRequired, createData);  // Create a new medication record (requires login)
router.put('/:id', loginRequired, updateData);  // Update a medication record (requires login)
router.delete('/:id', loginRequired, deleteData);  // Delete a medication record (requires login)

// Export the router to be used in other parts of the app
module.exports = router;
