// import { supabaseAdmin } from "../config/supabase.js";
// import { HttpError, assertFound } from "../utils/httpError.js";
// import { scoreResume, scoreGithubWithAi } from "./aiService.js";
// import { analyzeGithubProfile } from "./githubService.js";
// import { sendRejectionEmail } from "./emailService.js";

// const finalScoreFor = ({ skillsScore, experienceScore, githubScore }) =>
//   Math.round(skillsScore * 0.4 + experienceScore * 0.4 + githubScore * 0.2);

// const candidateNameFor = (user, fallback) =>
//   user?.user_metadata?.full_name || user?.email || fallback || "Candidate";

// export const createApplication = async ({ user, payload }) => {
//   const { data: job, error: jobError } = await supabaseAdmin
//     .from("jobs")
//     .select("id,title,description,minimum_score_threshold")
//     .eq("id", payload.jobId)
//     .single();

//   if (jobError) throw new HttpError(404, "Job not found");
//   assertFound(job, "Job not found");

//   const resumeScore = await scoreResume({
//     resumeText: payload.resumeText,
//     jobDescription: job.description,
//   });

//   const githubAnalysis = await analyzeGithubProfile(payload.githubUrl);
//   let githubScore = githubAnalysis.githubScore;
//   let githubReasoning = githubAnalysis.githubReasoning;

//   if (githubAnalysis.summary) {
//     try {
//       const aiGithub = await scoreGithubWithAi({
//         githubSummary: githubAnalysis.summary,
//         jobDescription: job.description,
//       });
//       githubScore = aiGithub.githubScore;
//       githubReasoning = aiGithub.githubReasoning;
//     } catch {
//       githubReasoning = `${githubReasoning} AI enhancement was unavailable, so the heuristic GitHub score was used.`;
//     }
//   }

//   const finalScore = finalScoreFor({
//     skillsScore: resumeScore.skillsScore,
//     experienceScore: resumeScore.experienceScore,
//     githubScore,
//   });

//   const threshold = Number(job.minimum_score_threshold || 0);
//   const isRejected = threshold > 0 && finalScore < threshold;
//   const rejectionReason = isRejected
//     ? `Final score ${finalScore} is below the minimum threshold of ${threshold}.`
//     : null;

//   const application = {
//     user_id: user.id,
//     job_id: payload.jobId,
//     candidate_name: payload.fullName || candidateNameFor(user),
//     candidate_email: payload.email || user.email,
//     resume_url: payload.resumeUrl || null,
//     resume_text: payload.resumeText,
//     skills: payload.skills || null,
//     experience: payload.experience || null,
//     education: payload.education || null,
//     portfolio_url: payload.portfolioUrl || null,
//     github_url: payload.githubUrl || null,
//     skills_score: resumeScore.skillsScore,
//     experience_score: resumeScore.experienceScore,
//     education_score: resumeScore.educationScore,
//     github_score: githubScore,
//     final_score: finalScore,
//     ai_reasoning: resumeScore.overallReasoning,
//     github_reasoning: githubReasoning,
//     status: isRejected ? "Rejected" : "Pending",
//     rejection_reason: rejectionReason,
//   };

//   const { data, error } = await supabaseAdmin
//     .from("applications")
//     .insert(application)
//     .select("*")
//     .single();

//   if (error) throw new HttpError(500, "Failed to store application", error.message);

//   if (isRejected) {
//     await sendRejectionEmail({ to: application.candidate_email });
//   }

//   return data;
// };

// export const listApplicationsForJob = async ({ jobId, status, search, sort }) => {
//   let query = supabaseAdmin
//     .from("applications")
//     .select("*")
//     .eq("job_id", jobId);

//   if (status && status !== "All") query = query.eq("status", status);
//   if (search) {
//     query = query.or(
//       `candidate_name.ilike.%${search}%,candidate_email.ilike.%${search}%`,
//     );
//   }

//   query = query.order("final_score", { ascending: sort === "lowest" });

//   const { data, error } = await query;
//   if (error) throw new HttpError(500, "Failed to fetch applications", error.message);
//   return data;
// };

// export const getTopCandidates = async (jobId) => {
//   const { data, error } = await supabaseAdmin
//     .from("applications")
//     .select("candidate_name,final_score,status")
//     .eq("job_id", jobId)
//     .order("final_score", { ascending: false })
//     .limit(10);

//   if (error) throw new HttpError(500, "Failed to fetch top candidates", error.message);

//   return data.map((candidate) => ({
//     candidateName: candidate.candidate_name,
//     finalScore: candidate.final_score,
//     status: candidate.status,
//   }));
// };

// export const updateApplicationStatus = async ({ applicationId, status }) => {
//   const { data, error } = await supabaseAdmin
//     .from("applications")
//     .update({ status })
//     .eq("id", applicationId)
//     .select("*")
//     .single();

//   if (error) throw new HttpError(500, "Failed to update application", error.message);
//   return data;
// };
