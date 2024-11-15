// Import required models for treatments, patients, and medications
const Treatment = require('../models/treatment.model');
const Patient = require('../models/patient.model');
const Medication = require('../models/medication.model');

// Function to seed treatment data
const seedTreatments = async (num) => {
    // Fetch all patients and medications from the database
    const patients = await Patient.find();
    const medications = await Medication.find();
    
    // If no patients exist, log an error and exit
    if (patients.length === 0) {
        console.error('No patients found to associate with treatments.');
        return;
    }

    // If no medications exist, log an error and exit
    if (medications.length === 0) {
        console.error('No medications found to associate with treatments.');
        return;
    }

    // Array to hold the generated treatment records
    const treatments = [];

    // Generate 'num' random treatment records
    for (let i = 0; i < num; i++) {
        const patient = patients[Math.floor(Math.random() * patients.length)];  // Pick a random patient
        const medication = medications[Math.floor(Math.random() * medications.length)];  // Pick a random medication
        treatments.push({
            patient: patient._id,  // Associate the treatment with a patient
            medication: medication._id,  // Associate the treatment with a medication
        });
    }

    // Insert the generated treatments into the database
    try {
        await Treatment.insertMany(treatments);
        console.log(`${num} treatments seeded successfully!`);  // Log success message
    } catch (error) {
        console.error('Error seeding treatments:', error);  // Log any errors during insertion
    }
};

// Export the seed function for use in other parts of the application
module.exports = seedTreatments;
