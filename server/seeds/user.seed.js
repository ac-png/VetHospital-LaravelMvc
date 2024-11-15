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
        const firstName = nameParts[0] || 'First';  // Default to 'First' if no first name
        const lastName = nameParts[nameParts.length - 1] || 'Last';  // Default to 'Last' if no last name
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;  // Generate an email

        // Validate email format
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailRegex.test(email)) {
            console.error(`Generated invalid email: ${email}`);
            return null;  // Skip this user if the email is invalid
        }

        return {
            full_name: fullName,
            password: faker.internet.password(),  // Generate a random password
            email: email,
            role: role._id  // Associate the role with the user
        };
    }).filter(user => user !== null);  // Filter out any invalid users

    // Insert the generated users into the database
    if (users.length > 0) {
        try {
            await User.insertMany(users);
            console.log(`Users seeded successfully, one for each role!`);
        } catch (error) {
            console.error('Error seeding users:', error);  // Log any errors during insertion
        }
    } else {
        console.error('No valid users to insert.');
    }
};

// Export the seed function for use in other parts of the application
module.exports = seedUsers;
