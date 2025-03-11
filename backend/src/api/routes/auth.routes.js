const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authValidation = require('../validations/auth.validation');

const router = express.Router();

// Public routes
router.post('/register', authValidation.register, authController.register);
router.post('/login', authValidation.login, authController.login);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;