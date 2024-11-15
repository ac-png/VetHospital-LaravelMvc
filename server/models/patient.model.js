const { Schema, model } = require('mongoose');

// Define the schema for patients
const patientSchema = new Schema({
    name: {
        type: String,  // Name of the patient
        required: true  // Name is mandatory
    },
    species: {
        type: String,  // Species of the patient (e.g., Dog, Cat)
        required: true  // Species is mandatory
    },
    breed: {
        type: String,  // Breed of the patient
        required: true  // Breed is mandatory
    },
    age: {
        type: Number,  // Age of the patient
        required: true  // Age is mandatory
    },
    owner_id: {
        type: Schema.Types.ObjectId,  // Reference to the Owner (User)
        ref: 'User',  // Link to the 'User' model
        required: true  // Owner field is mandatory
    },
    image: {
        type: String,  // Optional field for the patient's image URL
    }
}, { timestamps: true });  // Automatically create createdAt and updatedAt fields

// Export the Patient model based on the schema
module.exports = model('Patient', patientSchema);
