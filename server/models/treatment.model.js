const { Schema, model } = require('mongoose');

const treatmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Patient is required']
    },
    medication: {
        type: Schema.Types.ObjectId,
        ref: 'Medication',
        required: [true, 'Medication is required']
    }
}, { timestamps: true });

module.exports = model('Treatment', treatmentSchema);