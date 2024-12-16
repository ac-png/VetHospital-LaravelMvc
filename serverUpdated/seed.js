const mongoose = require('mongoose');
const seedRoles = require('./seeds/role.seed');
const seedUsers = require('./seeds/user.seed');
const seedHospitals = require('./seeds/hospital.seed');
const seedVeterinarians = require('./seeds/veterinarian.seed');
const seedPatients = require('./seeds/patient.seed');
const seedPatientVeterinarians = require('./seeds/patientVeterinarian.seed');
const connectDB = require('./config/db');

const clearDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.db.dropDatabase();
        console.log("Database cleared.");
    } else {
        console.log("Error: Database is not connected.");
    }
};

const seedDatabase = async () => {
    try {
        await connectDB();
        await clearDatabase();

        await seedRoles(); 
        await seedUsers();
        await seedHospitals();
        await seedVeterinarians();
        await seedPatients();
        await seedPatientVeterinarians();

        console.log("Seeding completed.");
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
