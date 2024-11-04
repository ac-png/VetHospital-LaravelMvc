const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5001;

require('dotenv').config();
require('./config/db.js')();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});