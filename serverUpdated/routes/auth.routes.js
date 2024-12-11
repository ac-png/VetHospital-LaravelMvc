const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authenticate, (req, res) => {
  res.json(req.user);
});

router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
