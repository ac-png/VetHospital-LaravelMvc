const { faker } = require('@faker-js/faker');
const Patient = require('../models/patient.model');

const seedPatients = async (num) => {
    const patients = [];
    for (let i = 0; i < num; i++) {
        patients.push({
            name: faker.person.firstName(),
            species: faker.word.adjective(),
            breed: faker.word.adjective(),
            age: faker.number.int(15),
            owner: faker.person.firstName()
        });
    }

    try {
        await Patient.insertMany(patients);
        console.log(`${num} patients seeded successfully!`);
    } catch (error) {
        console.error('Error seeding patients:', error);
    }
};

module.exports = seedPatients;
