import express from 'express';
import { reportEmergency, getEmergencies } from '../controllers/emergencyController.js';

const router = express.Router();

router.post('/report', reportEmergency);
router.get('/active', getEmergencies);

export default router;
