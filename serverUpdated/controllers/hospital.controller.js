const Hospital = require('../models/hospital.model');
const Patient = require('../models/patient.model');

exports.createHospital = async (req, res) => {
    const { name } = req.body;

    if (req.user.role.name !== 'admin') {
        return res.status(403).json({
            message: 'You are not authorized to delete this patient'
        });
    }
    
    try {
        const newHospital = new Hospital({
            name,
            user: req.user._id,
        });

        await newHospital.save();
        res.status(201).json(newHospital);
    } catch (err) {
        res.status(500).json({ message: 'Error creating hospital', error: err.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Hospital.find({ user: req.user._id }).populate('user', 'username email');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories', error: err.message });
    }
};

exports.getHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id).populate('user', 'username email');
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json(hospital);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching hospital', error: err.message });
    }
};

exports.deleteHospital = async (req, res) => {
    const id = req.params.id;

    if (req.user.role.name !== 'admin') {
        return res.status(403).json({
            message: 'You are not authorized to delete this hospital'
        });
    }

    try {
        await Patient.deleteMany({ hospital: id });

        const hospital = await Hospital.findByIdAndDelete(id);
        
        if (!hospital) {
            return res.status(404).json({
                message: `Hospital with id: ${id} not found`
            });
        }

        return res.status(200).json({
            message: `Hospital with id: ${id} and its associated patients deleted successfully`
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                message: `Hospital with id: ${id} not found`
            });
        }

        return res.status(500).json({
            message: 'Error deleting hospital or associated patients',
            error: err.message
        });
    }
};

exports.updateHospital = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (req.user.role.name !== 'admin') {
        return res.status(403).json({
            message: 'You are not authorized to update this hospital'
        });
    }

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        if (name) hospital.name = name;

        await hospital.save();
        res.status(200).json({ message: 'Hospital updated successfully', hospital });
    } catch (err) {
        res.status(500).json({ message: 'Error updating hospital', error: err.message });
    }
};