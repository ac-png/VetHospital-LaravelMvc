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
        const fullName = faker.person.fullName();
        const [firstName, lastName] = fullName.split(' ');
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

        users.push({
            full_name: fullName,
            password: faker.internet.password(),
            email: email,
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