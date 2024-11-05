const express = require('express');
const router = express.Router();

const { 
    login,
    signUp,
    forgotPassword
} = require('../controllers/user.controller');

router.post('/login', login);
router.post('/signup', signUp);
router.post('/forgot-password', forgotPassword);

module.exports = router;