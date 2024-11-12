const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Patient is required']
    },
    vet_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Vet field is required']
    },
    appointment_date: {
        type: Date,
        required: [true, 'Date field is required']
    },
    status: {
        type: String,
        required: [true, 'Status field is required']
    },
    notes: {
        type: String,
    }
}, { timestamps: true });

module.exports = model('Appointment', appointmentSchema);