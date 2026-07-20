import { GoogleGenerativeAI } from "@google/generative-ai";
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
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const response = await model.generateContent(prompt);
  return response.response.text();
};

const completeJson = async (prompt) => {
  if (env.geminiApiKey) return getGeminiText(prompt);
  throw new HttpError(500, "Configure GEMINI_API_KEY");
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

// ========================================================
// 1. Mock TIN Lookup (Simulating secure database verify)
// ========================================================
async function mockTinDatabaseLookup(tinNumber) {
  const cleanTin = tinNumber.replace(/[^0-9]/g, "");
  const database = {
    123456789: {
      registeredName: "Global Tech Solutions Inc.",
      status: "Active",
      registrationDate: "2018-04-12",
      registeredAddress: "123 Corporate Blvd, Delaware, DE 19901",
    },
    987654321: {
      registeredName: "Legacy Paper Corp",
      status: "Dissolved",
      registrationDate: "1995-08-30",
      registeredAddress: "78 Forest Road, Portland, OR 97201",
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (database[cleanTin]) {
    return { found: true, ...database[cleanTin] };
  } else {
    return {
      found: false,
      error: "No registered business found for this TIN number.",
    };
  }
}

// ========================================================
// 2. Extracted Validation Helper
// ========================================================
const validateVerificationScore = (payload) => {
  const result = {
    scamRiskLevel:
      typeof payload.scamRiskLevel === "string"
        ? payload.scamRiskLevel.trim()
        : "High",
    verdict: typeof payload.verdict === "string" ? payload.verdict.trim() : "",
  };

  if (!result.verdict) {
    throw new HttpError(502, "AI verification response failed validation");
  }
  return result;
};

// ========================================================
// 3. New Exported Verification Service
// ========================================================
export const verifyJobPostLegitimacy = async ({
  jobTitle,
  companyName,
  jobDescription,
  tinProvided,
}) => {
  if (!env.geminiApiKey) {
    throw new HttpError(500, "Configure GEMINI_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(env.geminiApiKey);

  // Define tools compatible with @google/generative-ai
  const tools = [
    {
      functionDeclarations: [
        {
          name: "verifyEmployerTIN",
          description:
            "Queries the registry database to verify if a TIN exists and gets its registered company details.",
          parameters: {
            type: "OBJECT",
            properties: {
              tinNumber: {
                type: "STRING",
                description: "The Tax Identification Number (e.g. 12-3456789).",
              },
              claimedCompanyName: {
                type: "STRING",
                description: "The name of the company posting the job.",
              },
            },
            required: ["tinNumber"],
          },
        },
      ],
    },
  ];

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    tools: tools,
  });

  const prompt = `
You are an advanced recruitment fraud analyst. Analyze this job submission:
- Claimed Company: "${companyName}"
- Provided TIN: "${tinProvided || "None provided"}"
- Job Title: "${jobTitle || "Not specified"}"
- Description: "${jobDescription}"

If a TIN is provided, you MUST call the 'verifyEmployerTIN' tool.
Once you receive results, compare them.

At the very end, you MUST return ONLY a valid JSON object matching this exact shape (do not include markdown block quotes):
{"scamRiskLevel": "Low | Medium | High", "verdict": "Clear explanation of findings"}
`;

  // 1. Initial Call
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const functionCalls = response.functionCalls();

  // 2. If Gemini requests to use our TIN tool
  if (functionCalls && functionCalls.length > 0) {
    const call = functionCalls[0];
    if (call.name === "verifyEmployerTIN") {
      const { tinNumber } = call.args;
      const lookupResult = await mockTinDatabaseLookup(tinNumber);

      // We continue the conversation using a chat session to handle multi-turn execution
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: prompt }] },
          { role: "model", parts: response.candidates[0].content.parts },
        ],
      });

      // Send execution response back to Gemini
      const secondResult = await chat.sendMessage([
        {
          functionResponse: {
            name: "verifyEmployerTIN",
            response: lookupResult,
          },
        },
      ]);

      const finalOutput = secondResult.response.text();
      return {
        tinVerified: true,
        registryData: lookupResult,
        analysis: validateVerificationScore(parseJson(finalOutput)),
      };
    }
  }

  // Fallback if no TIN was provided or function call wasn't invoked
  return {
    tinVerified: false,
    analysis: validateVerificationScore(parseJson(response.text())),
  };
};
