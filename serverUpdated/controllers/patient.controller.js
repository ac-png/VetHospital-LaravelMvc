const Patient = require('../models/patient.model');
const Veterinarian = require('../models/veterinarian.model');
const PatientVeterinarian = require('../models/patientVeterinarian.model');
const Hospital = require('../models/hospital.model');

exports.createPatient = async (req, res) => {
    const { name, type, breed, age, hospital: hospitalName, veterinarianNames } = req.body;

    try {
        const hospital = await Hospital.findOne({ name: hospitalName });
        if (!hospital) {
            return res.status(400).json({ message: 'Hospital not found' });
        }

        if (req.user.role.name !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to create this patient' });
        }

        const newPatient = new Patient({
            name,
            type,
            breed,
            age,
            hospital: hospital._id,
            user: req.user._id,
        });

        await newPatient.save();

        if (veterinarianNames && Array.isArray(veterinarianNames) && veterinarianNames.length > 0) {
            const veterinarians = await Veterinarian.find({ name: { $in: veterinarianNames } });
            if (veterinarians.length !== veterinarianNames.length) {
                return res.status(404).json({ message: 'Some veterinarians not found' });
            }

            const patientVeterinarians = veterinarians.map(veterinarian => ({
                patient: newPatient._id,
                veterinarian: veterinarian._id
            }));

            await PatientVeterinarian.insertMany(patientVeterinarians);
        }

        res.status(201).json(newPatient);
    } catch (err) {
        res.status(500).json({ message: 'Error creating patient', error: err.message });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find({ user: req.user._id })
            .populate('user', 'username email')
            .populate('hospital', 'name')
            .exec();

        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching patients', error: err.message });
    }
};

exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)
            .populate('user', 'username email')
            .populate('hospital', 'name');
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const patientVeterinarians = await PatientVeterinarian.find({ patient: req.params.id }).populate('veterinarian');
        const veterinarians = patientVeterinarians.map(patientVeterinarian => patientVeterinarian.veterinarian);

        res.json({ patient, veterinarians });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching patient', error: err.message });
    }
};


exports.deletePatient = async (req, res) => {
    const id = req.params.id;

    if (req.user.role.name !== 'admin') {
        return res.status(403).json({
            message: 'You are not authorized to delete this patient'
        });
    }

    try {
        await PatientVeterinarian.deleteMany({ patient: id });

        const patient = await Patient.findByIdAndDelete(id);
        
        if (!patient) {
            return res.status(404).json({
                message: `Patient with id: ${id} not found`
            });
        }

        return res.status(200).json({
            message: `Patient with id: ${id} and its associated patient veterinarians deleted successfully`
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                message: `Patient with id: ${id} not found`
            });
        }

        return res.status(500).json({
            message: 'Error deleting patient or associated patient veterinarians',
            error: err.message
        });
    }
};

exports.updatePatient = async (req, res) => {
    const { title, description, completed, hospital: hospitalName, veterinarianNames } = req.body;
    const { id } = req.params;

    try {
        const hospital = await Hospital.findOne({ name: hospitalName });
        if (hospitalName && !hospital) {
            return res.status(400).json({ message: 'Hospital not found' });
        }

        if (req.user.role.name !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to update this patient' });
        }

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        if (title) patient.title = title;
        if (description) patient.description = description;
        if (completed !== undefined) patient.completed = completed;
        if (hospital) patient.hospital = hospital._id;

        await patient.save();

        if (veterinarianNames && Array.isArray(veterinarianNames) && veterinarianNames.length > 0) {
            const veterinarians = await Veterinarian.find({ name: { $in: veterinarianNames } });
            if (veterinarians.length !== veterinarianNames.length) {
                return res.status(404).json({ message: 'Some veterinarians not found' });
            }

            await PatientVeterinarian.deleteMany({ patient: patient._id });

            const patientVeterinarians = veterinarians.map(veterinarian => ({
                patient: patient._id,
                veterinarian: veterinarian._id
            }));

            await PatientVeterinarian.insertMany(patientVeterinarians);
        }

        res.status(200).json({ message: 'Patient updated successfully', patient });
    } catch (err) {
        res.status(500).json({ message: 'Error updating patient', error: err.message });
    }
};