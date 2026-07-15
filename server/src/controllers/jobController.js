import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createJob, getEmployerJobs, updateJob, deleteJob } from "../services/jobService.js";
import {
  getTopCandidates,
  listApplicationsForJob,
} from "../services/applicationService.js";


const stripHtml = (html) => html.replace(/<[^>]*>/g, "").trim();

const jobSchema = z.object({
  title: z.string().trim().min(3),
  type: z.string().trim().min(2),
  location: z.string().trim().min(2),

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

export const updateJobPost = asyncHandler(async (req, res) => {
  const payload = jobSchema.parse(req.body);
  const job = await updateJob({ jobId: req.params.id, payload });
  res.json({ job });
});

export const deleteJobPost = asyncHandler(async (req, res) => {
  await deleteJob(req.params.id);
  res.json({ success: true });
});
