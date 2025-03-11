const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bot',
    required: true
  },
  signalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signal',
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['MARKET', 'LIMIT']
  },
  side: {
    type: String,
    required: true,
    enum: ['BUY', 'SELL']
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number
  },
  status: {
    type: String,
    enum: ['NEW', 'PARTIALLY_FILLED', 'FILLED', 'CANCELED', 'REJECTED', 'EXPIRED'],
    default: 'NEW'
  },
  executionDetails: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Indexes for faster lookup
tradeSchema.index({ userId: 1, createdAt: -1 });
tradeSchema.index({ botId: 1, createdAt: -1 });
tradeSchema.index({ signalId: 1 });
tradeSchema.index({ orderId: 1 });
tradeSchema.index({ status: 1 });

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;