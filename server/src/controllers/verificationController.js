import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyJobPostLegitimacy } from "../services/aiService.js";

const verificationSchema = z.object({
  jobTitle: z.string().trim().min(2),
  companyName: z.string().trim().min(2),
  jobDescription: z.string().trim().min(20),
  tinProvided: z.string().trim().optional().or(z.literal("")),
});

export const validateJobPost = asyncHandler(async (req, res) => {
  const payload = verificationSchema.parse(req.body);
  const result = await verifyJobPostLegitimacy(payload);
  res.json(result);
});
