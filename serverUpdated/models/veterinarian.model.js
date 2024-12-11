const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema);

module.exports = Veterinarian;
