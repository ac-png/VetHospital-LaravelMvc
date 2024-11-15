const Appointment = require('../models/appointment.model');

// Function to read all appointments from the database
const readAll = (req, res) => {
    Appointment.find()  // Retrieve all appointments
        .then(appointments => res.json(appointments))  // Return appointments as a JSON response
        .catch(err => res.status(400).json('Error: ' + err));  // Handle errors with a 400 status code
};

// Function to read a specific appointment by ID
const readOne = (req, res) => {
    Appointment.findById(req.params.id)  // Find appointment by ID from the URL parameters
        .then(appointment => res.json(appointment))  // Return the found appointment as a JSON response
        .catch(err => res.status(400).json('Error: ' + err));  // Handle errors with a 400 status code
};

// Function to create a new appointment record
const createData = (req, res) => {
    console.log(req.body);  // Log the incoming request body for debugging
    let body = req.body;  // Extract the request body

    Appointment.create(body)  // Create a new appointment record in the database
        .then(data => {
            console.log(`New appointment created`, data);  // Log the new appointment data

            return res.status(201).json({
                message: "Appointment created",  // Return a success message and the created data
                data
            });
        })
        .catch(err => {
            console.log(err);  // Log any errors
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

    // Use the 'findByIdAndUpdate' method to find and update the Appointment document by its id
    Appointment.findByIdAndUpdate(id, body, {
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
                    message: `Appointment with id: ${id} not found`
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


// Function to handle deleting a Appointment by its ID
const deleteData = (req, res) => {
    let id = req.params.id;  // Get the appointment ID from the URL parameter

    // Attempt to delete the appointment with the given ID
    Appointment.findByIdAndDelete(id)
        .then(data => {
            // If no data is found, return a 404 error
            if(!data){
                return res.status(404).json({
                    message: `Appointment with id: ${id} not found`
                });
            }

            // If deleted successfully, send a success message
            return res.status(200).json({
                message: `Appointment with id: ${id} deleted`
            });
        })
        .catch(err => {
            // If there's a CastError (invalid ID format), return a 404 error
            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Appointment with id: ${id} not found`
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