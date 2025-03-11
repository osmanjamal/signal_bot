const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  pairs: {
    type: [String],
    required: true,
    default: []
  },
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  secret: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  stats: {
    signals: {
      type: Number,
      default: 0
    },
    executed: {
      type: Number,
      default: 0
    },
    failed: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for faster lookup
botSchema.index({ userId: 1 });
botSchema.index({ uuid: 1 }, { unique: true });

const Bot = mongoose.model('Bot', botSchema);

module.exports = Bot;