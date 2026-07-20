import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getEmployerProfile,
  updateEmployerProfile,
} from '../controllers/profileController.js';

const router = express.Router();

router.use(requireAuth);

router.get('/company', getEmployerProfile);

router.put('/company', updateEmployerProfile);

export default router;
