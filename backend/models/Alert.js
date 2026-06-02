const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  deviceId: { type: String },
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', alertSchema);
