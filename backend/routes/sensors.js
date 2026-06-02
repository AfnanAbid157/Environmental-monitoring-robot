const express = require('express');
const SensorData = require('../models/SensorData');
const Alert = require('../models/Alert');

module.exports = (io) => {
  const router = express.Router();

  // Receive data from ESP8266/Arduino
  router.post('/data', async (req, res) => {
    try {
      const { temperature, humidity, airQuality, deviceId } = req.body;
      
      const newData = new SensorData({ temperature, humidity, airQuality, deviceId });
      await newData.save();
      
      // Check for thresholds and create alerts if needed
      if (airQuality > 300) {
        const alert = new Alert({ type: 'Air Quality', message: 'Dangerous Air Quality Level', severity: 'critical', deviceId });
        await alert.save();
        io.emit('new_alert', alert);
      }
      
      // Emit real-time data to frontend dashboard
      io.emit('sensor_update', newData);
      
      res.status(201).json({ message: 'Data received successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/latest', async (req, res) => {
    try {
      const latestData = await SensorData.findOne().sort({ timestamp: -1 });
      res.json(latestData);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/history', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 100;
      const history = await SensorData.find().sort({ timestamp: -1 }).limit(limit);
      // Return chronological order for charts
      res.json(history.reverse());
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  return router;
};
