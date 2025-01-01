const express = require('express');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    deleteAppointment,
    updateAppointment
} = require('../controllers/appointment.controller');
const router = express.Router();

router.post('/', authenticate, authorize(['veterinarian', 'admin']), createAppointment);
router.delete('/:id', authenticate, authorize(['veterinarian', 'admin']), deleteAppointment);
router.put('/:id', authenticate, authorize(['veterinarian', 'admin']), updateAppointment);
router.get('/', authenticate, getAllAppointments);
router.get('/:id', authenticate, getAppointmentById);

module.exports = router;
