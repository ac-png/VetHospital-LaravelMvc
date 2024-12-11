const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    }],
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
