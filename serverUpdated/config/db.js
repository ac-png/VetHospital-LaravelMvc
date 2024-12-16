const mongoose = require('mongoose');
require('dotenv').config();

const init = async () => {
    mongoose.set('debug', true);
    
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to Database');
    } catch (err) {
        console.log(`Error: ${err.stack}`);
    }
};

module.exports = init;