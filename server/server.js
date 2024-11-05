const express = require('express');
const app = express();
const port = 5001;

require('dotenv').config();
require('./config/db.js')();

app.use(express.json());
app.use(express.static(__dirname + '/views/'));

app.use('/api/appointments', require('./routes/appointments.route.js'))
app.use('/api/billing', require('./routes/billings.route.js'))
app.use('/api/patients', require('./routes/patients.route.js'))
app.use('/api/medications', require('./routes/medications.route.js'))
app.use('/api/treatments', require('./routes/treatments.route.js'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});