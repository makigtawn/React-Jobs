// import { z } from "zod";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import {
//   createApplication,
//   updateApplicationStatus,
// } from "../services/applicationService.js";

// const applicationSchema = z.object({
//   jobId: z.string().uuid(),
//   fullName: z.string().trim().min(2).max(120),
//   email: z.string().trim().email(),
//   resumeUrl: z.string().trim().url().optional().or(z.literal("")),
//   resumeText: z.string().trim().min(80, "Resume text must be at least 80 characters"),
//   skills: z.string().trim().optional(),
//   experience: z.string().trim().optional(),
//   education: z.string().trim().optional(),
//   portfolioUrl: z.string().trim().url().optional().or(z.literal("")),
//   githubUrl: z.string().trim().url().optional().or(z.literal("")),
// });

// const statusSchema = z.object({
//   status: z.enum(["Pending", "Accepted", "Rejected"]),
// });

// export const submitApplication = asyncHandler(async (req, res) => {
//   const payload = applicationSchema.parse(req.body);
//   const application = await createApplication({ user: req.user, payload });
//   res.status(201).json({ application });
// });

// export const changeApplicationStatus = asyncHandler(async (req, res) => {
//   const { status } = statusSchema.parse(req.body);
//   const application = await updateApplicationStatus({
//     applicationId: req.params.applicationId,
//     status,
//   });
//   res.json({ application });
// });
