const { Schema, model } = require('mongoose');

// Define the schema for treatments
const treatmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,  // Reference to the Patient model
        ref: 'Patient',
        required: true  // Patient is required for a treatment
    },
    medication: {
        type: Schema.Types.ObjectId,  // Reference to the Medication model
        ref: 'Medication',
        required: true  // Medication is required for a treatment
    }
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Export the Treatment model based on the schema
module.exports = model('Treatment', treatmentSchema);
