const Medication = require('../models/medication.model');

// Function to read all medications from the database
const readAll = (req, res) => {
    Medication.find()  // Fetch all medication records
        .then(medications => res.json(medications))  // Return the medications as a JSON response
        .catch(err => res.status(400).json('Error: ' + err));  // Handle errors with a 400 status
};

// Function to read a specific medication by its ID
const readOne = (req, res) => {
    Medication.findById(req.params.id)  // Find the medication by ID from the URL parameters
        .then(medication => res.json(medication))  // Return the medication data as a JSON response
        .catch(err => res.status(400).json('Error: ' + err));  // Handle errors with a 400 status
};

// Function to create a new medication record
const createData = (req, res) => {
    console.log(req.body);  // Log the request body for debugging
    let body = req.body;  // Extract the body of the request

    Medication.create(body)  // Create a new medication record in the database
        .then(data => {
            console.log(`New medication created`, data);  // Log the newly created medication data

            return res.status(201).json({
                message: "Medication created",  // Return a success message and the created data
                data
            });
        })
        .catch(err => {
            console.log(err);  // Log any errors that occur
            // If the error is a validation error, return a 422 status code
            if(err.name === 'ValidationError'){
                return res.status(422).json(err);
            }
            // For other errors, return a 500 status code
            return res.status(500).json(err);
        });
};

const updateData = (req, res) => {
    // Extracting the id from the request parameters and the body of the request
    let id = req.params.id;
    let body = req.body;

    // Use the 'findByIdAndUpdate' method to find and update the Medication document by its id
    Medication.findByIdAndUpdate(id, body, {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Ensure that validation rules are applied
        useFindAndModify: true // Use the updated find and modify method (legacy option)
    })
    .then(data => {
        // If the update is successful, return a success response with the updated data
        return res.status(201).json(data);
    })
    .catch(err => {
        // Handle errors during the update process

        // Check if the error is a CastError (i.e., invalid id format)
        if(err.name === 'CastError'){

            // If the error is related to an invalid ObjectId, return a 404 (Not Found) response
            if(err.kind === 'ObjectId'){
                return res.status(404).json({
                    message: `Medication with id: ${id} not found`
                });
            }
            else {
                // If the error is another type of validation issue, return a 422 (Unprocessable Entity) response
                return res.status(422).json({
                    message: err.message
                });
            }

        }

        // For other types of errors, return a 500 (Internal Server Error) response
        return res.status(500).json(err);
    });
};


// Function to handle deleting a Medication by its ID
const deleteData = (req, res) => {
    let id = req.params.id;  // Get the medication ID from the URL parameter

    // Attempt to delete the medication with the given ID
    Medication.findByIdAndDelete(id)
        .then(data => {
            // If no data is found, return a 404 error
            if(!data){
                return res.status(404).json({
                    message: `Medication with id: ${id} not found`
                });
            }

            // If deleted successfully, send a success message
            return res.status(200).json({
                message: `Medication with id: ${id} deleted`
            });
        })
        .catch(err => {
            // If there's a CastError (invalid ID format), return a 404 error
            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Medication with id: ${id} not found`
                });
            }

            // For other errors, return a 500 server error
            return res.status(500).json(err);
        });
};


module.exports = {
    readAll,
    readOne,
    createData,
    updateData,
    deleteData
};