// Import required modules
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables
require('./config/db.js')();  // Initialize database connection

// Import seed data and models
const seedPatients = require('./seeds/patient.seed.js');
const Patient = require('./models/patient.model.js');

const seedAppointments = require('./seeds/appointment.seed.js');
const Appointment = require('./models/appointment.model.js');

const seedBillings = require('./seeds/billing.seed.js');
const Billing = require('./models/billing.model');

const seedTreatments = require('./seeds/treatment.seed.js');
const Treatment = require('./models/treatment.model.js');

const seedMedications = require('./seeds/medication.seed.js');
const Medication = require('./models/medication.model.js');

const seedRoles = require('./seeds/role.seed.js');
const Role = require('./models/role.model.js');

const seedUsers = require('./seeds/user.seed.js');
const User = require('./models/user.model.js');

// Function to clear existing data from the database
const clearDatabase = async () => {
    await Role.deleteMany({});
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    await Billing.deleteMany({});
    await Medication.deleteMany({});
    await Treatment.deleteMany({});
};

// Function to seed the database with new data
const seedDatabase = async () => {
    await clearDatabase();  // First, clear all collections
    await seedRoles();  // Seed roles
    await seedUsers();  // Seed users
    await seedPatients(10);  // Seed patients (10 records)
    await seedAppointments(10);  // Seed appointments (10 records)
    await seedBillings(10);  // Seed billings (10 records)
    await seedMedications(10);  // Seed medications (10 records)
    await seedTreatments(10);  // Seed treatments (10 records)
};

// Function to start the seeding process
const startSeeding = async () => {
    await seedDatabase();  // Run the seed database function
    console.log('Seeding completed.');  // Log success message
};

// Start the seeding process and handle errors
startSeeding().catch((err) => {
    console.error('Seeding error:', err);  // Log any errors
    mongoose.disconnect();  // Disconnect from database if error occurs
});
