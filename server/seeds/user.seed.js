const { faker } = require('@faker-js/faker');
const User = require('../models/user.model');
const Role = require('../models/role.model');

const seedUsers = async () => {
    const roles = await Role.find({ name: { $in: ['Admin', 'Owner', 'Vet'] } });
    
    if (roles.length !== 3) {
        console.error('Error: Could not find all the required roles.');
        return;
    }

    const users = roles.map((role) => {
        const fullName = faker.person.fullName();
        const nameParts = fullName.split(' ').filter(Boolean);
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1]
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

        return {
            full_name: fullName,
            password: faker.internet.password(),
            email: email,
            role: role._id
        };
    });

    try {
        await User.insertMany(users);
        console.log(`3 users seeded successfully, one for each role!`);
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

module.exports = seedUsers;
