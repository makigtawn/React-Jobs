import { Router } from "express";
import {
  createJobPost,
  listEmployerJobs,
  listJobApplications,
  listTopCandidates,
} from "../controllers/jobController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, createJobPost);
router.get("/mine", requireAuth, listEmployerJobs);
router.get("/:jobId/applications", requireAuth, listJobApplications);
router.get("/:jobId/top-candidates", requireAuth, listTopCandidates);

export default router;
