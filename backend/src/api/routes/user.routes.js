const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userValidation = require('../validations/user.validation');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// User routes
router.put('/profile', userValidation.updateProfile, userController.updateProfile);
router.put('/password', userValidation.changePassword, userController.changePassword);
router.post('/api-keys', userValidation.setApiKeys, userController.setApiKeys);
router.get('/api-keys/status', userController.hasApiKeys);

module.exports = router;