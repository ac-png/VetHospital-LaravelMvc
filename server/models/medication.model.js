const { Schema, model } = require('mongoose');

// Define the schema for medications
const medicationsSchema = new Schema({
    name: {
        type: String,  // Name of the medication
        required: true  // Name is mandatory
    }
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Export the Medications model based on the schema
module.exports = model('Medications', medicationsSchema);
