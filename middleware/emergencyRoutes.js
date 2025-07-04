import express from 'express';
import { reportEmergency, getEmergencies } from '../controllers/emergencyController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔐 Protected Routes
router.post('/report', authMiddleware, reportEmergency);
router.get('/active', authMiddleware, getEmergencies);

export default router;
