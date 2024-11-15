// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5001;

// Load environment variables and initialize the database connection
require('dotenv').config();
require('./config/db.js')();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the 'views' directory
app.use(express.static(__dirname + '/views/'));

// Middleware to check for JWT authentication in requests
app.use((req, res, next) => {
    let authHeader = req.headers?.authorization?.split(' ');

    if(req.headers?.authorization && authHeader[0] === 'Bearer'){
        // Verify the JWT token
        jwt.verify(authHeader[1], process.env.JWT_SECRET, (err, decoded) => {
            if(err) req.user = undefined;  // Invalid token
            req.user = decoded;  // Add decoded token data to the request object
            next();
        });
    }
    else {
        req.user = undefined;  // No token, set user to undefined
        next();
    }
});

// Define routes for various API endpoints
app.use('/api/users', require('./routes/users.route.js'));
app.use('/api/roles', require('./routes/roles.route.js'));
app.use('/api/appointments', require('./routes/appointments.route.js'));
app.use('/api/billing', require('./routes/billings.route.js'));
app.use('/api/patients', require('./routes/patients.route.js'));
app.use('/api/medications', require('./routes/medications.route.js'));
app.use('/api/treatments', require('./routes/treatments.route.js'));

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
