import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register); // New route for registration
router.post('/login', login);

export default router;

