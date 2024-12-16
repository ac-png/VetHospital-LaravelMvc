const { faker } = require('@faker-js/faker');
const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');
const Patient = require('../models/patient.model');

const seedHospitals = async () => {
    try {
        const users = await User.find();
        const patients = await Patient.find();

        if (users.length === 0) {
            throw new Error('No users found in the database. Please seed users first.');
        }

        const hospitals = [];
        for (let i = 0; i < 10; i++) {
            const hospitalPatients = faker.helpers.arrayElements(patients, faker.number.int({ min: 1, max: 5 }));
            hospitals.push({
                name: faker.company.name(),
                address: faker.location.streetAddress(),
                user: faker.helpers.arrayElement(users)._id,
                patients: hospitalPatients.map(patient => patient._id),
            });
        }

        if (hospitals.length > 0) {
            await Hospital.insertMany(hospitals);
            console.log(`${hospitals.length} Hospitals seeded successfully.`);
        } else {
            console.error('No hospitals to insert.');
        }

    } catch (err) {
        console.error('Error seeding hospitals:', err);
    }
};

module.exports = seedHospitals;
