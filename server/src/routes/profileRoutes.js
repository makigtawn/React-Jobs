import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getEmployerProfile,
  createEmployerProfile,
  updateEmployerProfile,
  deleteEmployerProfile,
} from '../controllers/profileController.js';

const router = express.Router();

router.use(requireAuth);

// Base route: /api/company
router.get('/', getEmployerProfile);       // READ
router.post('/', createEmployerProfile);   // CREATE
router.put('/', updateEmployerProfile);    // UPDATE
router.delete('/', deleteEmployerProfile); // DELETE

export default router;
