import pool from "../db/pool.js";
import { HttpError, assertFound } from "../utils/httpError.js";
import { scoreResume, scoreGithubWithAi } from "./aiService.js";
import { analyzeGithubProfile } from "./githubService.js";
import { sendRejectionEmail } from "./emailService.js";

const finalScoreFor = ({ skillsScore, experienceScore, githubScore }) =>
  Math.round(skillsScore * 0.4 + experienceScore * 0.4 + githubScore * 0.2);

const candidateNameFor = (user, fallback) =>
  user?.email || fallback || "Candidate";

export const createApplication = async ({ user, payload }) => {
  try {
    // Fetch the job
    const jobResult = await pool.query(
      "SELECT id, title, description, minimum_score_threshold FROM jobs WHERE id = $1",
      [payload.jobId]
    );

    if (jobResult.rows.length === 0)
      throw new HttpError(404, "Job not found");

    const job = jobResult.rows[0];

    const resumeScore = await scoreResume({
      resumeText: payload.resumeText,
      jobDescription: job.description,
    });

    const githubAnalysis = await analyzeGithubProfile(payload.githubUrl);
    let githubScore = githubAnalysis.githubScore;
    let githubReasoning = githubAnalysis.githubReasoning;

    if (githubAnalysis.summary) {
      try {
        const aiGithub = await scoreGithubWithAi({
          githubSummary: githubAnalysis.summary,
          jobDescription: job.description,
        });
        githubScore = aiGithub.githubScore;
        githubReasoning = aiGithub.githubReasoning;
      } catch {
        githubReasoning = `${githubReasoning} AI enhancement was unavailable, so the heuristic GitHub score was used.`;
      }
    }

    const finalScore = finalScoreFor({
      skillsScore: resumeScore.skillsScore,
      experienceScore: resumeScore.experienceScore,
      githubScore,
    });

    const threshold = Number(job.minimum_score_threshold || 0);
    const isRejected = threshold > 0 && finalScore < threshold;
    const rejectionReason = isRejected
      ? `Final score ${finalScore} is below the minimum threshold of ${threshold}.`
      : null;

    // Insert application
    const result = await pool.query(
      `INSERT INTO applications (
        user_id, job_id, candidate_name, candidate_email, resume_url,
        resume_text, skills, experience, education, portfolio_url,
        github_url, skills_score, experience_score, education_score,
        github_score, final_score, ai_reasoning, github_reasoning,
        status, rejection_reason
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING *`,
      [
        user.sub,
        payload.jobId,
        payload.fullName || candidateNameFor(user),
        payload.email || user.email,
        payload.resumeUrl || null,
        payload.resumeText,
        payload.skills || null,
        payload.experience || null,
        payload.education || null,
        payload.portfolioUrl || null,
        payload.githubUrl || null,
        resumeScore.skillsScore,
        resumeScore.experienceScore,
        resumeScore.educationScore,
        githubScore,
        finalScore,
        resumeScore.overallReasoning,
        githubReasoning,
        isRejected ? "Rejected" : "Pending",
        rejectionReason,
      ]
    );

    if (result.rows.length === 0)
      throw new HttpError(500, "Failed to store application");

    if (isRejected) {
      await sendRejectionEmail({ to: result.rows[0].candidate_email });
    }

    return result.rows[0];
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(500, "Failed to create application", error.message);
  }
};

export const listApplicationsForJob = async ({ jobId, status, search, sort }) => {
  try {
    let queryText = "SELECT * FROM applications WHERE job_id = $1";
    const params = [jobId];
    let paramIndex = 2;

    if (status && status !== "All") {
      queryText += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (search) {
      queryText += ` AND (candidate_name ILIKE $${paramIndex} OR candidate_email ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const sortOrder = sort === "lowest" ? "ASC" : "DESC";
    queryText += ` ORDER BY final_score ${sortOrder}`;

    const result = await pool.query(queryText, params);
    return result.rows;
  } catch (error) {
    throw new HttpError(500, "Failed to fetch applications", error.message);
  }
};

export const getTopCandidates = async (jobId) => {
  try {
    const result = await pool.query(
      `SELECT candidate_name, final_score, status
       FROM applications WHERE job_id = $1
       ORDER BY final_score DESC LIMIT 10`,
      [jobId]
    );

    return result.rows.map((candidate) => ({
      candidateName: candidate.candidate_name,
      finalScore: candidate.final_score,
      status: candidate.status,
    }));
  } catch (error) {
    throw new HttpError(500, "Failed to fetch top candidates", error.message);
  }
};

export const updateApplicationStatus = async ({ applicationId, status }) => {
  try {
    const result = await pool.query(
      "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *",
      [status, applicationId]
    );

    if (result.rows.length === 0)
      throw new HttpError(404, "Application not found");

    return result.rows[0];
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(500, "Failed to update application", error.message);
  }
};
