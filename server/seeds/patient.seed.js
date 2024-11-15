// Import faker for generating random data and models for database operations
const { faker } = require('@faker-js/faker');
const Patient = require('../models/patient.model');
const Role = require('../models/role.model');
const User = require('../models/user.model');

// List of possible species for patients
const speciesList = ['Dog', 'Cat', 'Horse', 'Rabbit', 'Bird', 'Fish'];

// Function to seed patient data
const seedPatients = async (num) => {
    // Find the "Owner" role to associate with patients
    const ownerRole = await Role.findOne({ name: 'Owner' });
    if (!ownerRole) {
        console.error('No role found for Owner.');
        return;
    }

    // Get all users with the "Owner" role
    const users = await User.find({ role: ownerRole._id });
    if (users.length === 0) {
        console.error('No owners found to associate with patients.');
        return;
    }

    // Array to hold the generated patient records
    const patients = [];
    
    // Generate 'num' random patient records
    for (let i = 0; i < num; i++) {
        const species = faker.helpers.arrayElement(speciesList);  // Pick a random species
        const { _id } = users[Math.floor(Math.random() * users.length)];  // Randomly pick an owner
        patients.push({
            name: faker.person.firstName(),  // Random patient name
            species: species,  // Random species
            breed: getBreedBySpecies(species),  // Get breed based on species
            age: faker.number.int({ min: 1, max: 15 }),  // Random age (1-15 years)
            owner_id: _id,  // Assign owner
        });
    }

    // Insert the generated patients into the database
    try {
        await Patient.insertMany(patients);
        console.log(`${num} patients seeded successfully!`);  // Log success message
    } catch (error) {
        console.error('Error seeding patients:', error);  // Log any errors during insertion
    }
};

// Helper function to get a breed based on the species of the animal
const getBreedBySpecies = (species) => {
    switch (species) {
        case 'Dog':
            return faker.animal.dog();  // Generate a random dog breed
        case 'Cat':
            return faker.animal.cat();  // Generate a random cat breed
        case 'Horse':
            return faker.animal.horse();  // Generate a random horse breed
        case 'Rabbit':
            return faker.animal.rabbit();  // Generate a random rabbit breed
        case 'Bird':
            return faker.animal.bird();  // Generate a random bird breed
        case 'Fish':
            return faker.animal.fish();  // Generate a random fish breed
        default:
            return 'Unknown Breed';  // Return 'Unknown Breed' for unspecified species
    }
};

// Export the seed function for use elsewhere
module.exports = seedPatients;
