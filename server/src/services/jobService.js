import pool from "../db/pool.js";
import { HttpError } from "../utils/httpError.js";

export const createJob = async ({ user, payload }) => {
  try {
    const result = await pool.query(
      `INSERT INTO jobs (
        employer_id, title, type, location, description, salary,
        company_name, company_description, contact_email, contact_phone,
        minimum_score_threshold, employer_tin
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        user.sub,
        payload.title,
        payload.type,
        payload.location,
        payload.description,
        payload.salary,
        payload.companyName,
        payload.companyDescription,
        payload.contactEmail,
        payload.contactPhone,
        payload.minimumScoreThreshold,
        payload.employerTin || null, // Safely handles empty or missing TIN values
      ]
    );

    if (result.rows.length === 0)
      throw new HttpError(500, "Failed to create job");
    return result.rows[0];
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(500, "Failed to create job", error.message);
  }
};

export const getEmployerJobs = async (employerId) => {
  try {
    const result = await pool.query(
      `SELECT id, title, minimum_score_threshold, created_at
       FROM jobs WHERE employer_id = $1 ORDER BY created_at DESC`,
      [employerId]
    );

    return result.rows;
  } catch (error) {
    throw new HttpError(500, "Failed to fetch employer jobs", error.message);
  }
};

export const updateJob = async ({ jobId, payload }) => {
  try {
    const result = await pool.query(
      `UPDATE jobs SET
        title = $1, type = $2, location = $3, description = $4,
        salary = $5, company_name = $6, company_description = $7,
        contact_email = $8, contact_phone = $9, minimum_score_threshold = $10,
        employer_tin = $11
       WHERE id = $12 RETURNING *`,
      [
        payload.title,
        payload.type,
        payload.location,
        payload.description,
        payload.salary,
        payload.companyName,
        payload.companyDescription,
        payload.contactEmail,
        payload.contactPhone,
        payload.minimumScoreThreshold,
        payload.employerTin || null, // Updates TIN, setting to null if cleared out
        jobId,
      ]
    );

    if (result.rows.length === 0)
      throw new HttpError(404, "Job not found");
    return result.rows[0];
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(500, "Failed to update job", error.message);
  }
};

export const deleteJob = async (jobId) => {
  try {
    const result = await pool.query("DELETE FROM jobs WHERE id = $1", [jobId]);

    if (result.rowCount === 0)
      throw new HttpError(404, "Job not found");
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(500, "Failed to delete job", error.message);
  }
};
