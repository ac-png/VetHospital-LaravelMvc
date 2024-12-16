const { faker } = require('@faker-js/faker');
const Veterinarian = require('../models/veterinarian.model');
const User = require('../models/user.model');

const seedVeterinarians = async () => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            throw new Error('No users found in the database. Please seed users first.');
        }

        const veterinarians = [];
        for (let i = 0; i < 10; i++) {
            veterinarians.push({
                name: faker.person.fullName(),
                address: faker.location.streetAddress(),
                bio: faker.lorem.sentences(3),
                user: users[Math.floor(Math.random() * users.length)]._id,
            });
        }

        await Veterinarian.insertMany(veterinarians);
        console.log(`${veterinarians.length} Veterinarians seeded successfully.`);
    } catch (err) {
        console.error('Error seeding veterinarians:', err);
    }
};

module.exports = seedVeterinarians;
