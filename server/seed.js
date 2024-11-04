const mongoose = require('mongoose');
require('dotenv').config();
require('./config/db.js')();

const seedPatients = require('./seeds/patients');
const Patient = require('./models/patients.model.js');

const seedAppointments = require('./seeds/appointments');
const Appointments = require('./models/appointments.model');

const clearDatabase = async () => {
    await Patient.deleteMany({});
    await Appointments.deleteMany({});
};

const seedDatabase = async () => {
    await clearDatabase();
    await seedPatients(10);
    await seedAppointments(10);
};

module.exports = seedDatabase;

const startSeeding = async () => {
    await seedDatabase();
    mongoose.disconnect();
    console.log('Seeding completed.');
};

startSeeding().catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
});
