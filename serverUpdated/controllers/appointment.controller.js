const Appointment = require('../models/appointment.model');

const createAppointment = async (req, res) => {
    try {
        const { date, reason, status, notes, user, patient, veterinarian, hospital } = req.body;
        const newAppointment = new Appointment({
            date,
            reason,
            status,
            notes,
            user,
            patient,
            veterinarian,
            hospital
        });
        const savedAppointment = await newAppointment.save();
        return res.status(201).json(savedAppointment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating appointment' });
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('user')
            .populate('patient')
            .populate('veterinarian')
            .populate('hospital')
            .sort({ date: -1 });
        return res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching appointments' });
    }
};

const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findById(id)
            .populate('user')
            .populate('patient')
            .populate('veterinarian')
            .populate('hospital');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        return res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching appointment' });
    }
};

const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { date, reason, status, notes, user, patient, veterinarian, hospital } = req.body;
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { date, reason, status, notes, user, patient, veterinarian, hospital },
            { new: true }
        );
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        return res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating appointment' });
    }
};

const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting appointment' });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
