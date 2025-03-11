// src/models/Signal.js
const mongoose = require('mongoose');

const signalSchema = new mongoose.Schema({
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bot',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['buy', 'sell']
  },
  symbol: {
    type: String,
    required: true
  },
  exchange: {
    type: String,
    default: 'binance'
  },
  price: {
    type: Number
  },
  status: {
    type: String,
    enum: ['received', 'processing', 'executed', 'failed', 'pending'],
    default: 'received'
  },
  executionDetails: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  rawData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Indexes for faster lookup
signalSchema.index({ botId: 1, createdAt: -1 });
signalSchema.index({ userId: 1, createdAt: -1 });
signalSchema.index({ status: 1 });

const Signal = mongoose.model('Signal', signalSchema);

module.exports = Signal;