// Import the Role model to interact with the database
const Role = require('../models/role.model');

// Function to seed role data
const seedRoles = async (num) => {
    // Define the roles to be seeded
    const roles = [
        { name: 'Admin' },  // Admin role
        { name: 'Owner' },  // Owner role
        { name: 'Vet' }     // Vet role
    ];

    // Attempt to insert the roles into the database
    try {
        await Role.insertMany(roles);
        console.log(`${num} roles seeded successfully!`);  // Log success message
    } catch (error) {
        console.error('Error seeding roles:', error);  // Log any errors during insertion
    }
};

// Export the seed function for use in other parts of the application
module.exports = seedRoles;
