import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getEmployerProfile,
  updateEmployerProfile,
} from '../controllers/profileController.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// GET /api/employer/profile - Get logged-in employer's profile
router.get('/profile', getEmployerProfile);

// PUT /api/employer/profile - Update logged-in employer's profile
router.put('/profile', updateEmployerProfile);

export default router;
