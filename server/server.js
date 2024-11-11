const express = require('express');
const app = express();
const port = 5001;

require('dotenv').config();
require('./config/db.js')();

app.use(express.json());
app.use(express.static(__dirname + '/views/'));

//// AUTHORIZATION /////////////
app.use((req, res, next) => {
    let authHeader = req.headers?.authorization?.split(' ');

    if(req.headers?.authorization && authHeader[0] === 'Bearer'){
        jwt.verify(authHeader[1], process.env.JWT_SECRET, (err, decoded) => {
            if(err) req.user = undefined;
            req.user = decoded;
            next();
        });
    }
    else {
        req.user = undefined;
        next();
    }
});
//////////////////////////////

app.use('/api/users', require('./routes/users.route.js'))
app.use('/api/roles', require('./routes/roles.route.js'))
app.use('/api/appointments', require('./routes/appointments.route.js'))
app.use('/api/billing', require('./routes/billings.route.js'))
app.use('/api/patients', require('./routes/patients.route.js'))
app.use('/api/medications', require('./routes/medications.route.js'))
app.use('/api/treatments', require('./routes/treatments.route.js'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});