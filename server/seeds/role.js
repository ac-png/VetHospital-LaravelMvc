const Role = require('../models/role.model');

const seedRoles = async (num) => {
    const roles = [
        { name: 'Admin' },
        { name: 'Owner' },
        { name: 'Vet' }
    ];

    try {
        await Role.insertMany(roles);
        console.log(`${num} roles seeded successfully!`);
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
};

module.exports = seedRoles;