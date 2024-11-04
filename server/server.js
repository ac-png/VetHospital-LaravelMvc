const express = require('express');
const app = express();
const port = 5001;

require('dotenv').config();
require('./config/db.js')();

app.use(express.json());
app.use(express.static(__dirname + '/views/'));

app.use('/api/patients', require('./routes/patients'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});