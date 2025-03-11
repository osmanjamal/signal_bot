const express = require('express');
const webhookController = require('../controllers/webhook.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const webhookMiddleware = require('../middlewares/webhook.middleware');

const router = express.Router();

// Webhook endpoint (no auth required)
router.post('/:uuid', webhookMiddleware, webhookController.processWebhook);

// Get signals for a bot (auth required)
router.get('/bot/:id/signals', authMiddleware, webhookController.getBotSignals);

module.exports = router;