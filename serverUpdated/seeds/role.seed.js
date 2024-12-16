const Role = require('../models/role.model');

const seedRoles = async () => {
    const roles = [
        { name: 'owner' },
        { name: 'veterinarian' },
        { name: 'admin' }
    ];

    try {
        for (const role of roles) {
            const existingRole = await Role.findOne({ name: role.name });
            if (!existingRole) {
                await Role.create(role);
                console.log(`Role ${role.name} created.`);
            } else {
                console.log(`Role ${role.name} already exists.`);
            }
        }
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
};

module.exports = seedRoles;
