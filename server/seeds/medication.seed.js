// Import faker for generating random data and the Medication model
const { faker } = require('@faker-js/faker');
const Medication = require('../models/medication.model');

// Function to seed medication data
const seedMedications = async (num) => {
    // Array to hold the generated medication records
    const medications = [];

    // Generate 'num' random medication records
    for (let i = 0; i < num; i++) {
        medications.push({
            name: faker.word.noun()  // Generate a random medication name
        });
    }

    // Insert the generated medications into the database
    try {
        await Medication.insertMany(medications);
        console.log(`${num} medications seeded successfully!`);  // Log success
    } catch (error) {
        console.error('Error seeding medications:', error);  // Log any errors during insertion
    }
};

// Export the seed function for use elsewhere
module.exports = seedMedications;
