const express = require('express');
const botController = require('../controllers/bot.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const botValidation = require('../validations/bot.validation');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Bot routes
router.post('/', botValidation.createBot, botController.createBot);
router.get('/', botController.getBots);
router.get('/:id', botController.getBotById);
router.put('/:id', botValidation.updateBot, botController.updateBot);
router.delete('/:id', botController.deleteBot);
router.post('/:id/regenerate-secret', botController.regenerateSecret);

module.exports = router;