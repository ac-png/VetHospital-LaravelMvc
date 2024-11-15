const Billing = require('../models/billing.model');

// Function to read all billing records from the database
const readAll = (req, res) => {
    Billing.find()  // Fetch all billing records
        .then(billings => res.json(billings))  // Return the billings as a JSON response
        .catch(err => res.status(400).json('Error: ' + err));  // Handle errors with a 400 status
};

// Function to read a specific billing record by ID
const readOne = (req, res) => {
    Billing.findById(req.params.id)  // Find the billing by ID from the URL parameters
        .then(billing => res.json(billing))  // Return the billing data as a JSON response
        .catch(err => res.status(400).json('Error: ' + err));  // Handle errors with a 400 status
};

// Function to create a new billing record
const createData = (req, res) => {
    console.log(req.body);  // Log the request body for debugging purposes
    let body = req.body;  // Extract the body from the request

    Billing.create(body)  // Create a new billing record in the database
        .then(data => {
            console.log(`New billing created`, data);  // Log the newly created billing data

            return res.status(201).json({
                message: "Billing created",  // Return a success message and the created data
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

};

// Function to handle deleting a Billing by its ID
const deleteData = (req, res) => {
    let id = req.params.id;  // Get the billing ID from the URL parameter

    // Attempt to delete the billing with the given ID
    Billing.findByIdAndDelete(id)
        .then(data => {
            // If no data is found, return a 404 error
            if(!data){
                return res.status(404).json({
                    message: `Billing with id: ${id} not found`
                });
            }

            // If deleted successfully, send a success message
            return res.status(200).json({
                message: `Billing with id: ${id} deleted`
            });
        })
        .catch(err => {
            // If there's a CastError (invalid ID format), return a 404 error
            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Billing with id: ${id} not found`
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