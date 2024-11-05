const mongoose = require('mongoose');
require('dotenv').config();
require('./config/db.js')();

const seedPatients = require('./seeds/patients.seed.js');
const Patient = require('./models/patients.model.js');

const seedAppointments = require('./seeds/appointments.seed.js');
const Appointments = require('./models/appointments.model');

const seedBilling = require('./seeds/billing.seed.js');
const Billing = require('./models/billing.model');

const seedTreatments = require('./seeds/treatments.seed.js');
const Treatments = require('./models/treatments.model');

const seedMedications = require('./seeds/medications.seed.js');
const Medications = require('./models/medications.model');

const seedRoles = require('./seeds/roles.seed.js');
const Role = require('./models/roles.model');

const seedUsers = require('./seeds/users.seed.js');
const User = require('./models/users.model');

const clearDatabase = async () => {
    await Patient.deleteMany({});
    await Appointments.deleteMany({});
    await Billing.deleteMany({});
    await Medications.deleteMany({});
    await Treatments.deleteMany({});
    await Role.deleteMany({});
    await User.deleteMany({});
};

const seedDatabase = async () => {
    await clearDatabase();
    await seedPatients(10);
    await seedAppointments(10);
    await seedBilling(10);
    await seedMedications(10);
    await seedTreatments(10);
    await seedRoles(3);
    await seedUsers(20);
};

const startSeeding = async () => {
    await seedDatabase();
    console.log('Seeding completed.');
};

startSeeding().catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
});
