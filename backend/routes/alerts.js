const express = require('express');
const Alert = require('../models/Alert');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(50);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { type, message, severity, deviceId } = req.body;
    const alert = new Alert({ type, message, severity, deviceId });
    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
