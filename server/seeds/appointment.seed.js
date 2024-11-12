const { faker } = require('@faker-js/faker');
const Appointment = require('../models/appointment.model');
const Patient = require('../models/patient.model');
const Role = require('../models/role.model');
const User = require('../models/user.model');

const seedAppointments = async (num) => {
    const patients = await Patient.find();
    
    if (patients.length === 0) {
        console.error('No patients found to associate with appointments.');
        return;
    }

    const vetRole = await Role.findOne({ name: 'Vet' });
    if (!vetRole) {
        console.error('No role found for Vet.');
        return;
    }
    const users = await User.find({ role: vetRole._id });

    if (users.length === 0) {
        console.error('No vets found to associate with appointments.');
        return;
    }

    const appointments = [];
    for (let i = 0; i < num; i++) {
        const patient = patients[Math.floor(Math.random() * patients.length)];
        const { _id } = users[Math.floor(Math.random() * users.length)];
        appointments.push({
            patient: patient._id,
            vet_id: _id,
            appointment_date: faker.date.anytime(),
            status: faker.word.adjective(),
            notes: faker.lorem.sentence()
        });
    }

    try {
        await Appointment.insertMany(appointments);
        console.log(`${num} appointments seeded successfully!`);
    } catch (error) {
        console.error('Error seeding appointments:', error);
    }
};

module.exports = seedAppointments;
