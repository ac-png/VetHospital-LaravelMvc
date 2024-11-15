// Import express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions for treatment-related operations
const { 
    readAll, 
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/treatment.controller');

// Import middleware to check if the user is logged in
const { loginRequired } = require('../controllers/user.controller');

// Define routes for treatment-related operations
router.get('/', readAll);  // Get all treatments
router.get('/:id', loginRequired, readOne);  // Get a specific treatment (requires login)
router.post('/', loginRequired, createData);  // Create a new treatment (requires login)
router.put('/:id', loginRequired, updateData);  // Update a treatment (requires login)
router.delete('/:id', loginRequired, deleteData);  // Delete a treatment (requires login)

// Export the router to be used in other parts of the app
module.exports = router;
