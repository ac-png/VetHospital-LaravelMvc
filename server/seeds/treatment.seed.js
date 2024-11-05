const Treatment = require('../models/treatment.model');
const Patient = require('../models/patient.model');
const Medication = require('../models/medication.model');

const seedTreatments = async (num) => {
    const patients = await Patient.find();
    const medications = await Medication.find();
    
    if (patients.length === 0) {
        console.error('No patients found to associate with treatments.');
        return;
    }

    if (medications.length === 0) {
        console.error('No medications found to associate with treatments.');
        return;
    }

    const treatments = [];
    for (let i = 0; i < num; i++) {
        const patient = patients[Math.floor(Math.random() * patients.length)];
        const medication = medications[Math.floor(Math.random() * medications.length)];
        treatments.push({
            patient: patient._id,
            medication: medication._id,
        });
    }

    try {
        await Treatment.insertMany(treatments);
        console.log(`${num} treatments seeded successfully!`);
    } catch (error) {
        console.error('Error seeding treatments:', error);
    }
};

module.exports = seedTreatments;
