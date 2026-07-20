// export const env = {
//   nodeEnv: process.env.NODE_ENV || "development",
//   port: Number(process.env.PORT || 3000),
//   clientOrigin: process.env.CLIENT_ORIGIN,
//   geminiApiKey: process.env.GEMINI_API_KEY || "",
//   openaiApiKey: process.env.OPENAI_API_KEY || "",
//   githubToken: process.env.GITHUB_TOKEN || "",
//   smtpHost: process.env.SMTP_HOST || "",
//   smtpPort: Number(process.env.SMTP_PORT || 587),
//   smtpUser: process.env.SMTP_USER || "",
//   smtpPass: process.env.SMTP_PASS || "",
//   smtpFrom: process.env.SMTP_FROM || "Strata <no-reply@strata.local>",
// };


export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  geminiApiKey: process.env.GEMINI_API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
};

const required = [
  'DATABASE_URL',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
];

for (const variable of required) {
  if (!process.env[variable]) {
    console.warn(`⚠️  Warning: ${variable} is not set in .env file`);
  }
}
