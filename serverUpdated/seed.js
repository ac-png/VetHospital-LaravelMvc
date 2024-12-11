const mongoose = require('mongoose');
require('dotenv').config();
require('./config/db.js')();

const seedPatients = require('./seeds/patient.seed.js');
const Patient = require('./models/patient.model.js');

const seedCategories = require('./seeds/hospital.seed.js');
const Hospital = require('./models/hospital.model.js');

const seedVeterinarians = require('./seeds/veterinarian.seed.js');
const Veterinarian = require('./models/veterinarian.model.js');

const seedRoles = require('./seeds/role.seed.js');
const Role = require('./models/role.model.js');

const seedUsers = require('./seeds/user.seed.js');
const User = require('./models/user.model.js');

const clearDatabase = async () => {
    await Role.deleteMany({});
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Hospital.deleteMany({});
    await Veterinarian.deleteMany({});
};

const seedDatabase = async () => {
    await clearDatabase();
    await seedRoles();
    await seedUsers();
    await seedCategories(5);
    await seedVeterinarians(10);
    await seedPatients(50);
};

const startSeeding = async () => {
    await seedDatabase();
    console.log('Seeding completed.');
};

startSeeding().catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
});
