const { faker } = require('@faker-js/faker');
const Billing = require('../models/billing.model');
const Patient = require('../models/patients.model');
const Appointment = require('../models/appointment.model');

const seedBilling = async (num) => {
    const patients = await Patient.find();
    const appointments = await Appointment.find();
    
    if (patients.length === 0) {
        console.error('No patients found to associate with billings.');
        return;
    }

    if (appointments.length === 0) {
        console.error('No appointments found to associate with billings.');
        return;
    }

    const billing = [];
    for (let i = 0; i < num; i++) {
        const patient = patients[Math.floor(Math.random() * patients.length)];
        const appointment = appointments[Math.floor(Math.random() * patients.length)];
        billings.push({
            patient: patient._id,
            appointment: appointment._id,
            appointment_date: faker.date.anytime(),
            amount: faker.number.float().toFixed(2),
            payment_status: faker.word.adjective()
        });
    }

    try {
        await Billing.insertMany(billing);
        console.log(`${num} billing seeded successfully!`);
    } catch (error) {
        console.error('Error seeding billing:', error);
    }
};

module.exports = seedBilling;
