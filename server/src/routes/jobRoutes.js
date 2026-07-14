// import { Router } from "express";
// import {
//   createJobPost,
//   listEmployerJobs,
//   listJobApplications,
//   listTopCandidates,
// } from "../controllers/jobController.js";
// import { requireAuth } from "../middleware/auth.js";

// const router = Router();

// router.post("/", requireAuth, createJobPost);
// router.get("/mine", requireAuth, listEmployerJobs);
// router.get("/:jobId/applications", requireAuth, listJobApplications);
// router.get("/:jobId/top-candidates", requireAuth, listTopCandidates);

// export default router;

import express from "express";
import pool from "../db/pool.js";

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

export default router;
