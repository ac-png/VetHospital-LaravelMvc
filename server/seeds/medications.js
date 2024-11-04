const { faker } = require('@faker-js/faker');
const Medication = require('../models/medications.model');

const seedMedications = async (num) => {
    const medications = [];
    for (let i = 0; i < num; i++) {
        medications.push({
            name: faker.word.noun()
        });
    }

    try {
        await Medication.insertMany(medications);
        console.log(`${num} medications seeded successfully!`);
    } catch (error) {
        console.error('Error seeding medications:', error);
    }
};

module.exports = seedMedications;
