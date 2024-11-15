const { Schema, model } = require('mongoose');

// Define the schema for appointments
const appointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,  // Reference to the Patient model
        ref: 'Patient',
        required: true  // Patient is required for an appointment
    },
    vet_id: {
        type: Schema.Types.ObjectId,  // Reference to the User model (vet)
        ref: 'User',
        required: true  // Vet is required for an appointment
    },
    appointment_date: {
        type: Date,  // Date of the appointment
        required: true  // Appointment date is mandatory
    },
    status: {
        type: String,  // Status of the appointment (e.g., Scheduled, Completed)
        required: true  // Status is required
    },
    notes: {
        type: String,  // Optional field for notes
    }
}, { timestamps: true });  // Add createdAt and updatedAt fields automatically

// Export the model based on the schema
module.exports = model('Appointment', appointmentSchema);
