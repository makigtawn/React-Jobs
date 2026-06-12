import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";

const clampScore = (value) => {
  const score = Number(value);
  if (!Number.isFinite(score)) return null;
  return Math.max(0, Math.min(100, Math.round(score)));
};

const parseJson = (content) => {
  const trimmed = content.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) throw new HttpError(502, "AI response did not contain JSON");
    return JSON.parse(match[0]);
  }
};

const validateResumeScore = (payload) => {
  const result = {
    skillsScore: clampScore(payload.skillsScore),
    experienceScore: clampScore(payload.experienceScore),
    educationScore: clampScore(payload.educationScore),
    overallReasoning:
      typeof payload.overallReasoning === "string"
        ? payload.overallReasoning.trim()
        : "",
  };

  if (
    result.skillsScore === null ||
    result.experienceScore === null ||
    result.educationScore === null ||
    !result.overallReasoning
  ) {
    throw new HttpError(502, "AI resume score response failed validation");
  }

  return result;
};

const validateGithubScore = (payload) => {
  const result = {
    githubScore: clampScore(payload.githubScore),
    githubReasoning:
      typeof payload.githubReasoning === "string"
        ? payload.githubReasoning.trim()
        : "",
  };

  if (result.githubScore === null || !result.githubReasoning) {
    throw new HttpError(502, "AI GitHub score response failed validation");
  }

  return result;
};

const getGeminiText = async (prompt) => {
  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const response = await model.generateContent(prompt);
  return response.response.text();
};

const getOpenAIText = async (prompt) => {
  const openai = new OpenAI({ apiKey: env.openaiApiKey });
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0]?.message?.content || "";
};

const completeJson = async (prompt) => {
  if (env.geminiApiKey) return getGeminiText(prompt);
  if (env.openaiApiKey) return getOpenAIText(prompt);
  throw new HttpError(500, "Configure GEMINI_API_KEY or OPENAI_API_KEY");
};

export const scoreResume = async ({ resumeText, jobDescription }) => {
  const prompt = `
You are an expert technical recruiter. Score this applicant against the job description.
Return only valid JSON with this exact shape:
{"skillsScore":0,"experienceScore":0,"educationScore":0,"overallReasoning":""}

Scoring rules:
- Each numeric score must be an integer from 0 to 100.
- skillsScore measures direct skill match.
- experienceScore measures role depth, seniority, and relevant achievements.
- educationScore measures relevant degrees, certifications, and training.
- overallReasoning must be concise and evidence based.

Job description:
${jobDescription}

Resume text:
${resumeText}
`;

  return validateResumeScore(parseJson(await completeJson(prompt)));
};

export const scoreGithubWithAi = async ({ githubSummary, jobDescription }) => {
  const prompt = `
You are evaluating a developer GitHub profile for a hiring workflow.
Return only valid JSON with this exact shape:
{"githubScore":0,"githubReasoning":""}

Scoring rules:
- githubScore must be an integer from 0 to 100.
- Reward relevant languages, useful repositories, clear README files, stars, recent activity, and project complexity.
- Penalize empty, stale, or unrelated profiles.

Job description:
${jobDescription}

GitHub profile summary:
${JSON.stringify(githubSummary, null, 2)}
`;

  return validateGithubScore(parseJson(await completeJson(prompt)));
};
