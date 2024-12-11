const express = require('express');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const {
    createPatient,
    getAllPatients,
    getPatient,
    deletePatient,
    updatePatient
} = require('../controllers/patient.controller');

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), createPatient);
router.delete('/:id', authenticate, authorize(['admin']), deletePatient);
router.put('/:id', authenticate, authorize(['admin']), updatePatient);

router.get('/', authenticate, getAllPatients);
router.get('/:id', authenticate, getPatient);

module.exports = router;
