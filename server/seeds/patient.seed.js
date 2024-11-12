const { faker } = require('@faker-js/faker');
const Patient = require('../models/patient.model');
const Role = require('../models/role.model');
const User = require('../models/user.model');

const speciesList = ['Dog', 'Cat', 'Horse', 'Rabbit', 'Bird', 'Fish'];

const seedPatients = async (num) => {
    const ownerRole = await Role.findOne({ name: 'Owner' });
    if (!ownerRole) {
        console.error('No role found for Owner.');
        return;
    }
    const users = await User.find({ role: ownerRole._id });

    if (users.length === 0) {
        console.error('No vets found to associate with appointments.');
        return;
    }

    const patients = [];
    for (let i = 0; i < num; i++) {
        const species = faker.helpers.arrayElement(speciesList);
        const { _id } = users[Math.floor(Math.random() * users.length)];
        patients.push({
            name: faker.person.firstName(),
            species: species,
            breed: getBreedBySpecies(species),
            age: faker.number.int({ min: 1, max: 15 }),
            owner_id: _id,
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
