// Import faker for generating random data and models for database operations
const { faker } = require('@faker-js/faker');
const Billing = require('../models/billing.model');
const Patient = require('../models/patient.model');
const Appointment = require('../models/appointment.model');

// Function to seed billing data
const seedBilling = async (num) => {
    // Get all patients and appointments from the database
    const patients = await Patient.find();
    const appointments = await Appointment.find();
    
    // If no patients exist, log an error and exit
    if (patients.length === 0) {
        console.error('No patients found to associate with billings.');
        return;
    }

    // Array to hold the generated billing records
    const billings = [];

    // Generate 'num' random billing records
    for (let i = 0; i < num; i++) {
        // Randomly pick a patient and an appointment
        const patient = patients[Math.floor(Math.random() * patients.length)];
        const appointment = appointments[Math.floor(Math.random() * appointments.length)];

        // Create a billing record with random data
        billings.push({
            patient: patient._id,
            appointment: appointment._id,
            appointment_date: faker.date.anytime(),
            amount: parseFloat(faker.finance.amount()),  // Generate random amount
            payment_status: faker.word.adjective()  // Generate random payment status
        });
    }

    // Insert the generated billings into the database
    try {
        await Billing.insertMany(billings);
        console.log(`${num} billing seeded successfully!`);
    } catch (error) {
        console.error('Error seeding billing:', error);  // Log any errors during insertion
    }
};

// Export the seed function for use elsewhere
module.exports = seedBilling;
