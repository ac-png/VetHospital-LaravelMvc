// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Function to initialize the database connection
const init = () => {
    mongoose.set('debug', true);  // Enable debug mode for mongoose queries

    // Connect to MongoDB using the Atlas URL from environment variables
    mongoose.connect(process.env.DB_ATLAS_URL)
    .catch(err => {
        console.log(`Error: ${err.stack}`);  // Log any connection errors
    });

    // Log a message when the database connection is successfully established
    mongoose.connection.on('open', () => {
        console.log('Connected to Database');
    });
};

// Export the init function to be used elsewhere
module.exports = init;
