const mongoose = require('mongoose');
require('dotenv').config();
require('./config/db.js')();

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

const clearDatabase = async () => {
    await Role.deleteMany({});
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    await Billing.deleteMany({});
    await Medication.deleteMany({});
    await Treatment.deleteMany({});
};

const seedDatabase = async () => {
    await clearDatabase();
    await seedRoles(3);
    await seedUsers(20);
    await seedPatients(10);
    await seedAppointments(10);
    await seedBillings(10);
    await seedMedications(10);
    await seedTreatments(10);
};

const startSeeding = async () => {
    await seedDatabase();
    console.log('Seeding completed.');
};

startSeeding().catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
});
