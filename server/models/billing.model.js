const { Schema, model } = require('mongoose');

// Define the schema for billing
const billingSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,  // Reference to the Patient model
        ref: 'Patient',
        required: true  // Patient is required for billing
    },
    appointment: {
        type: Schema.Types.ObjectId,  // Reference to the Appointment model
        ref: 'Appointment',
        required: true  // Appointment is required for billing
    },
    appointment_date: {
        type: Date,  // Date of the appointment
        required: true  // Appointment date is mandatory
    },
    amount: {
        type: Number,  // Total billing amount
        required: true  // Amount is required
    },
    payment_status: {
        type: String,  // Status of the payment (e.g., Paid, Pending)
        required: true  // Payment status is mandatory
    }
}, { timestamps: true });  // Automatically create createdAt and updatedAt fields

// Export the Billing model based on the schema
module.exports = model('Billing', billingSchema);
