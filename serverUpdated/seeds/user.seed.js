const User = require('../models/user.model');
const Role = require('../models/role.model');

const seedUsers = async () => {
    const users = [
        { username: 'owner', password: 'password123', email: 'owner@example.com', role: 'owner' },
        { username: 'vet', password: 'password123', email: 'vet@example.com', role: 'veterinarian' },
        { username: 'admin', password: 'password123', email: 'admin@example.com', role: 'admin' }
    ];

    try {
        for (const user of users) {
            const role = await Role.findOne({ name: user.role });

            if (!role) {
                console.log(`Role ${user.role} not found, skipping user creation for ${user.username}`);
                continue;
            }

            const existingUser = await User.findOne({ username: user.username });
            if (!existingUser) {
                const newUser = new User({
                    ...user,
                    role: role._id,
                });
                await newUser.save();
                console.log(`User ${user.username} created.`);
            } else {
                console.log(`User ${user.username} already exists.`);
            }
        }
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

module.exports = seedUsers;
