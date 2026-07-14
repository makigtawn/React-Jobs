import { Router } from "express";
import {
  changeApplicationStatus,
  submitApplication,
} from "../controllers/applicationController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, submitApplication);
router.patch("/:applicationId/status", requireAuth, changeApplicationStatus);

router.get('/dashboard', requireAuth, (req, res) => {
  res.json({ message: `Hello ${req.user.email}` });
});
export default router;
