const { faker } = require('@faker-js/faker');
const Patient = require('../models/patient.model');
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');

const seedPatients = async () => {
    try {
        const users = await User.find();
        const hospitals = await Hospital.find();

        if (users.length === 0) {
            throw new Error('No users found in the database. Please seed users first.');
        }
        if (hospitals.length === 0) {
            throw new Error('No hospitals found in the database. Please seed hospitals first.');
        }

        const patients = [];
        const animalTypes = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Reptile', 'Fish'];

        for (let i = 0; i < 20; i++) {
            patients.push({
                name: faker.animal.petName(),
                type: faker.helpers.arrayElement(animalTypes),
                notes: faker.lorem.sentences(2),
                user: faker.helpers.arrayElement(users)._id,
                hospital: faker.helpers.arrayElement(hospitals)._id,
            });
        }

        await Patient.insertMany(patients);
        console.log(`${patients.length} Patients seeded successfully.`);
    } catch (err) {
        console.error('Error seeding patients:', err);
    }
};

module.exports = seedPatients;
