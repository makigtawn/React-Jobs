import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createJob, getEmployerJobs } from "../services/jobService.js";
import {
  getTopCandidates,
  listApplicationsForJob,
} from "../services/applicationService.js";

/**
 * Strip HTML tags to measure the real text length.
 * This ensures the min-30-char rule applies to actual content,
 * not HTML markup added by CKEditor.
 */
const stripHtml = (html) => html.replace(/<[^>]*>/g, "").trim();

const jobSchema = z.object({
  title: z.string().trim().min(3),
  type: z.string().trim().min(2),
  location: z.string().trim().min(2),
  /**
   * description is now an HTML string from CKEditor.
   * We accept the raw HTML string and validate that the
   * stripped plain-text content is at least 30 characters.
   * No sanitization here — DOMPurify handles that on the frontend
   * at render time, which is the correct layer for XSS prevention.
   */
  description: z
    .string()
    .refine((val) => stripHtml(val).length >= 30, {
      message: "Description must contain at least 30 characters of text",
    }),
  salary: z.string().trim().min(2),
  companyName: z.string().trim().min(2),
  companyDescription: z.string().trim().min(10),
  contactEmail: z.string().trim().email(),
  contactPhone: z.string().trim().optional(),
  minimumScoreThreshold: z.number().min(0).max(100).default(0),
});

const dashboardQuerySchema = z.object({
  status: z.enum(["All", "Pending", "Accepted", "Rejected"]).optional(),
  search: z.string().trim().optional(),
  sort: z.enum(["highest", "lowest"]).optional(),
});

export const createJobPost = asyncHandler(async (req, res) => {
  const payload = jobSchema.parse(req.body);
  const job = await createJob({ user: req.user, payload });
  res.status(201).json({ job });
});

export const listEmployerJobs = asyncHandler(async (req, res) => {
  const jobs = await getEmployerJobs(req.user.id);
  res.json({ jobs });
});

export const listJobApplications = asyncHandler(async (req, res) => {
  const query = dashboardQuerySchema.parse(req.query);
  const applications = await listApplicationsForJob({
    jobId: req.params.jobId,
    status: query.status,
    search: query.search,
    sort: query.sort || "highest",
  });
  res.json({ applications });
});

export const listTopCandidates = asyncHandler(async (req, res) => {
  const candidates = await getTopCandidates(req.params.jobId);
  res.json(candidates);
});







// import { z } from "zod";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { createJob, getEmployerJobs } from "../services/jobService.js";
// import {
//   getTopCandidates,
//   listApplicationsForJob,
// } from "../services/applicationService.js";

// const jobSchema = z.object({
//   title: z.string().trim().min(3),
//   type: z.string().trim().min(2),
//   location: z.string().trim().min(2),
//   description: z.string().trim().min(30),
//   salary: z.string().trim().min(2),
//   companyName: z.string().trim().min(2),
//   companyDescription: z.string().trim().min(10),
//   contactEmail: z.string().trim().email(),
//   contactPhone: z.string().trim().optional(),
//   minimumScoreThreshold: z.number().min(0).max(100).default(0),
// });

// const dashboardQuerySchema = z.object({
//   status: z.enum(["All", "Pending", "Accepted", "Rejected"]).optional(),
//   search: z.string().trim().optional(),
//   sort: z.enum(["highest", "lowest"]).optional(),
// });

// export const createJobPost = asyncHandler(async (req, res) => {
//   const payload = jobSchema.parse(req.body);
//   const job = await createJob({ user: req.user, payload });
//   res.status(201).json({ job });
// });

// export const listEmployerJobs = asyncHandler(async (req, res) => {
//   const jobs = await getEmployerJobs(req.user.id);
//   res.json({ jobs });
// });

// export const listJobApplications = asyncHandler(async (req, res) => {
//   const query = dashboardQuerySchema.parse(req.query);
//   const applications = await listApplicationsForJob({
//     jobId: req.params.jobId,
//     status: query.status,
//     search: query.search,
//     sort: query.sort || "highest",
//   });
//   res.json({ applications });
// });

// export const listTopCandidates = asyncHandler(async (req, res) => {
//   const candidates = await getTopCandidates(req.params.jobId);
//   res.json(candidates);
// });
