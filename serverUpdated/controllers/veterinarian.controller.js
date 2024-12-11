const Veterinarian = require('../models/veterinarian.model');
const PatientVeterinarian = require('../models/patientVeterinarian.model');

exports.createVeterinarian = async (req, res) => {
    const { name } = req.body;

    if (req.user.role.name !== 'admin') {
        return res.status(403).json({
            message: 'You are not authorized to create this veterinarian'
        });
    }

    try {
        const existingVeterinarian = await Veterinarian.findOne({ name });
        if (existingVeterinarian) {
            return res.status(400).json({ message: 'Veterinarian already exists' });
        }

        const newVeterinarian = new Veterinarian({
            name,
            user: req.user._id
        });

        await newVeterinarian.save();

        res.status(201).json(newVeterinarian);
    } catch (err) {
        res.status(500).json({ message: 'Error creating veterinarian', error: err.message });
    }
};

exports.deleteVeterinarian = async (req, res) => {
    const id = req.params.id;

    if (req.user.role.name !== 'admin') {
        return res.status(403).json({
            message: 'You are not authorized to delete this veterinarian'
        });
    }

    try {
        await PatientVeterinarian.deleteMany({ veterinarian: id });

        const veterinarian = await Veterinarian.findByIdAndDelete(id);
        
        if (!veterinarian) {
            return res.status(404).json({
                message: `Veterinarian with id: ${id} not found`
            });
        }

        return res.status(200).json({
            message: `Veterinarian with id: ${id} and its associated patient veterinarians deleted successfully`
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({
                message: `Veterinarian with id: ${id} not found`
            });
        }

        return res.status(500).json({
            message: 'Error deleting veterinarian or associated patient veterinarians',
            error: err.message
        });
    }
};

exports.updateVeterinarian = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (req.user.role.name !== 'admin') {
        return res.status(403).json({
            message: 'You are not authorized to update this veterinarian'
        });
    }

    try {
        const veterinarian = await Veterinarian.findById(id);
        if (!veterinarian) {
            return res.status(404).json({ message: 'Veterinarian not found' });
        }

        if (name) veterinarian.name = name;

        await veterinarian.save();
        res.status(200).json({ message: 'Veterinarian updated successfully', veterinarian });
    } catch (err) {
        res.status(500).json({ message: 'Error updating veterinarian', error: err.message });
    }
};
