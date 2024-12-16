const express = require('express');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), (req, res) => {
    res.status(201).json({ message: 'Hospital created' });
});

router.delete('/:id', authenticate, authorize(['admin']), (req, res) => {
    res.status(200).json({ message: `Hospital with ID ${req.params.id} deleted` });
});

router.put('/:id', authenticate, authorize(['admin']), (req, res) => {
    res.status(200).json({ message: `Hospital with ID ${req.params.id} updated` });
});

router.get('/', authenticate, (req, res) => {
    res.status(200).json({ message: 'All hospitals fetched' });
});

router.get('/:id', authenticate, (req, res) => {
    res.status(200).json({ message: `Hospital with ID ${req.params.id} fetched` });
});

module.exports = router;
