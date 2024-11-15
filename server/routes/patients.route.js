// Import express and create a router
const express = require('express');
const router = express.Router();

// Import controller functions for patient-related operations
const { 
    readAll, 
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/patient.controller');

// Import middleware to check if the user is logged in
const { loginRequired } = require('../controllers/user.controller');

// Define routes for patient-related operations
router.get('/', readAll);  // Get all patient records
router.get('/:id', loginRequired, readOne);  // Get a specific patient record (requires login)
router.post('/', loginRequired, createData);  // Create a new patient record (requires login)
router.put('/:id', loginRequired, updateData);  // Update a patient record (requires login)
router.delete('/:id', loginRequired, deleteData);  // Delete a patient record (requires login)

// Export the router to be used in other parts of the app
module.exports = router;
