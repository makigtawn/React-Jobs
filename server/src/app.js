import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import jobsRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";
import verificationRoutes from "./routes/verificationRoutes.js"; 

export const createApp = () => {
  const app = express();

  const allowedOrigins = [
    // 'https://strata-backend-ri59.onrender.com',
    'https://strata-hire.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    env.clientOrigin,
  ].filter(Boolean);

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  // Handle preflight requests with the same options so
  // Access-Control-Allow-Credentials is included on OPTIONS responses.
  app.options(/(.*)/, cors(corsOptions));

  app.use(cors(corsOptions));

  app.use(helmet());

  app.use(express.json({ limit: "1mb" }));

  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/jobs", jobsRoutes);
  app.use("/api/verify", verificationRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
