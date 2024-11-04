const { Schema, model } = require('mongoose');

const billingSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Patient is required']
    },
    appointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: [true, 'Appointment is required']
    },
    appointment_date: {
        type: Date,
        required: [true, 'Date field is required']
    },
    Amount: {
        type: Number,
        required: [true, 'Amount field is required']
    },
    payment_status: {
        type: String,
        required: [true, 'Status field is required']
    }
}, { timestamps: true });

module.exports = model('Billing', billingSchema);