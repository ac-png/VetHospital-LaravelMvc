const { faker } = require('@faker-js/faker');
const Patient = require('../models/patient.model');

const speciesList = ['Dog', 'Cat', 'Horse', 'Rabbit', 'Bird', 'Fish'];

const seedPatients = async (num) => {
    const patients = [];
    for (let i = 0; i < num; i++) {
        const species = faker.helpers.arrayElement(speciesList);
        patients.push({
            name: faker.person.firstName(),
            species: species,
            breed: getBreedBySpecies(species),
            age: faker.number.int({ min: 1, max: 15 }),
            owner: faker.person.fullName()
        });
    }

    try {
        await Patient.insertMany(patients);
        console.log(`${num} patients seeded successfully!`);
    } catch (error) {
        console.error('Error seeding patients:', error);
    }
};

const getBreedBySpecies = (species) => {
    switch (species) {
        case 'Dog':
            return faker.animal.dog();
        case 'Cat':
            return faker.animal.cat();
        case 'Horse':
            return faker.animal.horse();
        case 'Rabbit':
            return faker.animal.rabbit();
        case 'Bird':
            return faker.animal.bird();
        case 'Fish':
            return faker.animal.fish();
        default:
            return 'Unknown Breed';
    }
};

module.exports = seedPatients;
