// Import faker for generating random data and the necessary models for User and Role
const { faker } = require('@faker-js/faker');
const User = require('../models/user.model');
const Role = require('../models/role.model');

// Function to seed user data
const seedUsers = async () => {
    // Fetch the roles for 'Admin', 'Owner', and 'Vet' from the database
    const roles = await Role.find({ name: { $in: ['Admin', 'Owner', 'Vet'] } });
    
    // If not all required roles are found, log an error and exit
    if (roles.length !== 3) {
        console.error('Error: Could not find all the required roles.');
        return;
    }

    // Generate a user for each of the fetched roles
    const users = roles.map((role) => {
        const fullName = faker.person.fullName();  // Generate a random full name
        const nameParts = fullName.split(' ').filter(Boolean);  // Split the name into first and last names
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;  // Generate an email

        return {
            full_name: fullName,
            password: faker.internet.password(),  // Generate a random password
            email: email,
            role: role._id  // Associate the role with the user
        };
    });

    // Insert the generated users into the database
    try {
        await User.insertMany(users);
        console.log(`3 users seeded successfully, one for each role!`);  // Log success message
    } catch (error) {
        console.error('Error seeding users:', error);  // Log any errors during insertion
    }
};

// Export the seed function for use in other parts of the application
module.exports = seedUsers;
