const { Schema, model } = require('mongoose');

const medicationsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    }
}, { timestamps: true});

module.exports = model('Medications', medicationsSchema);