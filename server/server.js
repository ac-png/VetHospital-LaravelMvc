const express = require('express');
const app = express();
const port = 5001;

require('dotenv').config();
require('./config/db.js')();

const seedDatabase = require('./seed.js'); // Make sure this exports a function
seedDatabase();

app.use(express.json());
app.use(express.static(__dirname + '/views/'));

app.use('/api/appointments', require('./routes/appointments'))
app.use('/api/billing', require('./routes/billing'))
app.use('/api/patients', require('./routes/patients'))
app.use('/api/medications', require('./routes/medications'))
app.use('/api/treatments', require('./routes/treatments'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});