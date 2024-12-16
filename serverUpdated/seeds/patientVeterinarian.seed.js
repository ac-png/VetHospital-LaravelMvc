const { faker } = require('@faker-js/faker');
const PatientVeterinarian = require('../models/patientVeterinarian.model');
const Patient = require('../models/patient.model');
const Veterinarian = require('../models/veterinarian.model');

const seedPatientsVeterinarians = async () => {
    try {
        const patients = await Patient.find();
        const veterinarians = await Veterinarian.find();

        if (patients.length === 0) {
            throw new Error('No patients found in the database. Please seed patients first.');
        }
        if (veterinarians.length === 0) {
            throw new Error('No veterinarians found in the database. Please seed veterinarians first.');
        }

        const patientVeterinarianEntries = [];

        for (let i = 0; i < patients.length; i++) {
            const randomVeterinarian = faker.helpers.arrayElement(veterinarians);
            patientVeterinarianEntries.push({
                patient: patients[i]._id,
                veterinarian: randomVeterinarian._id
            });
        }

        if (patientVeterinarianEntries.length > 0) {
            await PatientVeterinarian.insertMany(patientVeterinarianEntries);
            console.log(`${patientVeterinarianEntries.length} PatientVeterinarian relationships seeded successfully.`);
        } else {
            console.error('No PatientVeterinarian relationships to insert.');
        }
    } catch (err) {
        console.error('Error seeding PatientVeterinarian:', err);
    }
};

module.exports = seedPatientsVeterinarians;
