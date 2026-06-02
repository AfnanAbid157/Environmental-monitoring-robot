const axios = require('axios');

const API_URL = 'http://localhost:5000/api/sensors/data';
const DEVICE_ID = 'ESP8266-01';

console.log('Starting mock IoT device simulation...');

setInterval(async () => {
  // Generate random data
  const temperature = 20 + Math.random() * 15; // 20 to 35
  const humidity = 40 + Math.random() * 40; // 40 to 80
  
  // Occasionally spike AQI to trigger alerts
  const isSpike = Math.random() > 0.9;
  const airQuality = isSpike ? 350 + Math.random() * 100 : 50 + Math.random() * 150; 

  const payload = {
    temperature,
    humidity,
    airQuality,
    deviceId: DEVICE_ID
  };

  try {
    await axios.post(API_URL, payload);
    console.log(`Sent data -> Temp: ${temperature.toFixed(1)}°C, Hum: ${humidity.toFixed(1)}%, AQI: ${airQuality.toFixed(0)}`);
  } catch (err) {
    console.error('Failed to send data:', err.message);
  }
}, 3000); // Send data every 3 seconds
