const { faker } = require('@faker-js/faker');
const User = require('../models/user.model');
const Role = require('../models/role.model');

const seedUsers = async (num) => {
    const roles = await Role.find();
    
    if (roles.length === 0) {
        console.error('No roles found to associate with billings.');
        return;
    }

    const users = [];
    for (let i = 0; i < num; i++) {
        const role = roles[Math.floor(Math.random() * roles.length)];
        users.push({
            username: faker.internet.username(),
            password: faker.internet.password(),
            email: faker.internet.email(),
            role: role._id
        });
    }

    try {
        await User.insertMany(users);
        console.log(`${num} users seeded successfully!`);
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

module.exports = seedUsers;