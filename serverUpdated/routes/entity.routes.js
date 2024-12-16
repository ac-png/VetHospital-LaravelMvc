const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const {
    getAllPatients,
    getPatientById,
    getAllHospitals,
    getHospitalById,
    getAllVeterinarians,
    getVeterinarianById
} = require('../controllers/entityController');
const router = express.Router();

router.get('/patients', authenticate, getAllPatients);
router.get('/patients/:id', authenticate, getPatientById);

router.get('/hospitals', authenticate, getAllHospitals);
router.get('/hospitals/:id', authenticate, getHospitalById);

router.get('/veterinarians', authenticate, getAllVeterinarians);
router.get('/veterinarians/:id', authenticate, getVeterinarianById);

module.exports = router;
