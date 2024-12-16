const Patient = require('../models/patient.model');
const Hospital = require('../models/hospital.model');
const Veterinarian = require('../models/veterinarian.model');

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        return res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching patients' });
    }
};

const getPatientById = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        return res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching patient' });
    }
};

const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        return res.status(200).json(hospitals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching hospitals' });
    }
};

const getHospitalById = async (req, res) => {
    const { id } = req.params;
    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        return res.status(200).json(hospital);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching hospital' });
    }
};

const getAllVeterinarians = async (req, res) => {
    try {
        const veterinarians = await Veterinarian.find();
        return res.status(200).json(veterinarians);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching veterinarians' });
    }
};

const getVeterinarianById = async (req, res) => {
    const { id } = req.params;
    try {
        const veterinarian = await Veterinarian.findById(id);
        if (!veterinarian) {
            return res.status(404).json({ message: 'Veterinarian not found' });
        }
        return res.status(200).json(veterinarian);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching veterinarian' });
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    getAllHospitals,
    getHospitalById,
    getAllVeterinarians,
    getVeterinarianById
};
