const express = require('express');
const Device = require('../models/Device');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { deviceName, deviceId, location } = req.body;
    let device = await Device.findOne({ deviceId });
    if (device) return res.status(400).json({ error: 'Device ID already exists' });
    
    device = new Device({ deviceName, deviceId, location });
    await device.save();
    
    res.status(201).json(device);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
