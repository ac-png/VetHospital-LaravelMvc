const { faker } = require('@faker-js/faker');
const Appointment = require('../models/appointments.model');
const Patient = require('../models/patients.model');

const seedAppointments = async (num) => {
    const patients = await Patient.find();
    
    if (patients.length === 0) {
        console.error('No patients found to associate with appointments.');
        return;
    }

    const appointments = [];
    for (let i = 0; i < num; i++) {
        const patient = patients[Math.floor(Math.random() * patients.length)];
        appointments.push({
            patient: patient._id,
            vet: faker.person.firstName(),
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
