const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  airQuality: { type: Number, required: true },
  deviceId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
