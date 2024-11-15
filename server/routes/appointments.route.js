// Import express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions for handling appointments
const { 
    readAll, 
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/appointment.controller');

// Import middleware to check if the user is logged in
const { loginRequired } = require('../controllers/user.controller');

// Define routes for appointment-related operations
router.get('/', readAll);  // Get all appointments
router.get('/:id', loginRequired, readOne);  // Get a specific appointment (requires login)
router.post('/', loginRequired, createData);  // Create a new appointment (requires login)
router.put('/:id', loginRequired, updateData);  // Update an appointment (requires login)
router.delete('/:id', loginRequired, deleteData);  // Delete an appointment (requires login)

// Export the router to be used in other parts of the app
module.exports = router;
