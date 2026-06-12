import { Router } from "express";
import {
  changeApplicationStatus,
  submitApplication,
} from "../controllers/applicationController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, submitApplication);
router.patch("/:applicationId/status", requireAuth, changeApplicationStatus);

export default router;
