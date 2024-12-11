const mongoose = require('mongoose');

const patientVeterinarianSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    veterinarian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinarian',
        required: true
    }
}, { timestamps: true });

const PatientVeterinarian = mongoose.model('PatientVeterinarian', patientVeterinarianSchema);

module.exports = PatientVeterinarian;
