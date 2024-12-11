const express = require('express');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const {
    createVeterinarian,
    deleteVeterinarian,
    updateVeterinarian
} = require('../controllers/veterinarian.controller');

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), createVeterinarian);
router.delete('/:id', authenticate, authorize(['admin']), deleteVeterinarian);
router.put('/:id', authenticate, authorize(['admin']), updateVeterinarian);

module.exports = router;
