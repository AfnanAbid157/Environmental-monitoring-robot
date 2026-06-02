const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  deviceId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  location: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);
