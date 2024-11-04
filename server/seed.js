const mongoose = require('mongoose');
require('dotenv').config();
require('./config/db.js')();

const seedPatients = require('./seeds/patients');
const Patient = require('./models/patients.model.js');

const seedAppointments = require('./seeds/appointments');
const Appointments = require('./models/appointments.model');

const seedBilling = require('./seeds/billing');
const Billing = require('./models/billing.model');

const seedTreatments = require('./seeds/treatments');
const Treatments = require('./models/treatments.model');

const seedMedications = require('./seeds/medications');
const Medications = require('./models/medications.model');

const clearDatabase = async () => {
    await Patient.deleteMany({});
    await Appointments.deleteMany({});
    await Billing.deleteMany({});
    await Treatments.deleteMany({});
    await Medications.deleteMany({});
};

const seedDatabase = async () => {
    await clearDatabase();
    await seedPatients(10);
    await seedAppointments(10);
    await seedBilling(10);
    await seedTreatments(10);
    await seedMedications(10);
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
