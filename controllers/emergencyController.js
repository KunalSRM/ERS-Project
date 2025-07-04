import Emergency from '../models/Emergency.js';
import { sendSMS } from '../utils/sms.js';

export const reportEmergency = async (req, res) => {
  const emergency = await Emergency.create(req.body);

  // Send real-time update
  io.emit('newEmergency', emergency);

  // Send SMS alert
  await sendSMS(`New ${emergency.type} emergency at Latitude: ${emergency.location.latitude}, Longitude: ${emergency.location.longitude}`);

  res.status(201).json(emergency);
};

export const getEmergencies = async (req, res) => {
  const emergencies = await Emergency.find().sort({ timestamp: -1 });
  res.json(emergencies);
};

