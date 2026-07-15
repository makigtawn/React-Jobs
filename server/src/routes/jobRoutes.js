import express from "express";
import pool from "../db/pool.js";
import {
  createJobPost,
  listEmployerJobs,
  listJobApplications,
  listTopCandidates,
  updateJobPost,
  deleteJobPost,
} from "../controllers/jobController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/jobs
router.get("/", async (req, res, next) => {
  try {
    const limit = req.query.limit;

    let queryText = "SELECT * FROM jobs ORDER BY created_at DESC";
    const queryParams = [];

    if (limit) {
      queryText += " LIMIT $1";
      queryParams.push(Number(limit));
    }

    const { rows } = await pool.query(queryText, queryParams);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// POST /api/jobs - Create a new job
// router.post("/", requireAuth, createJobPost);
router.post("/", createJobPost);




// GET /api/jobs/mine - List employer's jobs
router.get("/mine", requireAuth, listEmployerJobs);

// GET /api/jobs/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

// PUT /api/jobs/:id - Update a job
router.put("/:id", requireAuth, updateJobPost);

// DELETE /api/jobs/:id - Delete a job
router.delete("/:id", requireAuth, deleteJobPost);

// GET /api/jobs/:jobId/applications
router.get("/:jobId/applications", requireAuth, listJobApplications);

// GET /api/jobs/:jobId/top-candidates
router.get("/:jobId/top-candidates", requireAuth, listTopCandidates);

export default router;
