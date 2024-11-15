// Import faker for generating random data and models for database operations
const { faker } = require('@faker-js/faker');
const Appointment = require('../models/appointment.model');
const Patient = require('../models/patient.model');
const Role = require('../models/role.model');
const User = require('../models/user.model');

// Function to seed appointment data
const seedAppointments = async (num) => {
    // Get all patients from the database
    const patients = await Patient.find();
    
    // If no patients exist, log an error and exit
    if (patients.length === 0) {
        console.error('No patients found to associate with appointments.');
        return;
    }

    // Find the "Vet" role to associate with appointments
    const vetRole = await Role.findOne({ name: 'Vet' });
    if (!vetRole) {
        console.error('No role found for Vet.');
        return;
    }

    // Find users (vets) associated with the "Vet" role
    const users = await User.find({ role: vetRole._id });

    // If no vets are found, log an error and exit
    if (users.length === 0) {
        console.error('No vets found to associate with appointments.');
        return;
    }

    // Array to hold the generated appointments
    const appointments = [];

    // Generate 'num' random appointments
    for (let i = 0; i < num; i++) {
        // Randomly pick a patient and a vet
        const patient = patients[Math.floor(Math.random() * patients.length)];
        const { _id } = users[Math.floor(Math.random() * users.length)];

        // Create an appointment object with random data
        appointments.push({
            patient: patient._id,
            vet_id: _id,
            appointment_date: faker.date.anytime(),
            status: faker.word.adjective(),
            notes: faker.lorem.sentence()
        });
    }

    // Insert the generated appointments into the database
    try {
        await Appointment.insertMany(appointments);
        console.log(`${num} appointments seeded successfully!`);
    } catch (error) {
        console.error('Error seeding appointments:', error);  // Log any errors during insertion
    }
};

// Export the seed function for use elsewhere
module.exports = seedAppointments;
