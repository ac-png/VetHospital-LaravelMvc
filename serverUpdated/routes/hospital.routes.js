const express = require('express');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const {
    createHospital,
    getAllCategories,
    getHospital,
    deleteHospital,
    updateHospital
} = require('../controllers/hospital.controller');

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), createHospital);
router.delete('/:id', authenticate, authorize(['admin']), deleteHospital);
router.put('/:id', authenticate, authorize(['admin']), updateHospital);

router.get('/', authenticate, getAllCategories);
router.get('/:id', authenticate, getHospital);

module.exports = router;
