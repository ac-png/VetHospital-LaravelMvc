const { faker } = require('@faker-js/faker');
const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');
const Patient = require('../models/patient.model');
const Veterinarian = require('../models/veterinarian.model');
const Hospital = require('../models/hospital.model');

const seedAppointments = async () => {
    try {
        const users = await User.find();
        const patients = await Patient.find();
        const veterinarians = await Veterinarian.find();
        const hospitals = await Hospital.find();

        if (users.length === 0) {
            throw new Error('No users found in the database. Please seed users first.');
        }
        if (patients.length === 0) {
            throw new Error('No patients found in the database. Please seed patients first.');
        }
        if (veterinarians.length === 0) {
            throw new Error('No veterinarians found in the database. Please seed veterinarians first.');
        }
        if (hospitals.length === 0) {
            throw new Error('No hospitals found in the database. Please seed hospitals first.');
        }

        const appointments = [];
        const statuses = ['pending', 'completed', 'cancelled'];

        for (let i = 0; i < 20; i++) {
            appointments.push({
                date: faker.date.soon(30),
                reason: faker.lorem.sentence(),
                status: faker.helpers.arrayElement(statuses),
                notes: faker.lorem.sentences(2),
                user: faker.helpers.arrayElement(users)._id,
                patient: faker.helpers.arrayElement(patients)._id,
                veterinarian: faker.helpers.arrayElement(veterinarians)._id,
                hospital: faker.helpers.arrayElement(hospitals)._id,
            });
        }

        if (appointments.length > 0) {
            await Appointment.insertMany(appointments);
            console.log(`${appointments.length} Appointments seeded successfully.`);
        } else {
            console.error('No appointments to insert.');
        }
    } catch (err) {
        console.error('Error seeding appointments:', err);
    }
};

module.exports = seedAppointments;