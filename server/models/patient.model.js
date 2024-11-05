const { Schema, model } = require('mongoose');

const patientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    species: {
        type: String,
        required: [true, 'Species field is required']
    },
    breed: {
        type: String,
        required: [true, 'Breed field is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    owner: {
        type: String,
        required: [true, 'Owner field is required']
    },
    image: {
        type: String,
    }
}, { timestamps: true});

module.exports = model('Patient', patientSchema);