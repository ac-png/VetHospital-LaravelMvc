const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['owner', 'veterinarian', 'admin'],
        required: true,
    },
});

module.exports = mongoose.model('Role', roleSchema);
