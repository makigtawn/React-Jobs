import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jobsRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";

export const createApp = () => {
  const app = express();

  const allowedOrigins = [
    'https://strata-backend-ri59.onrender.com',
    // 'http://localhost:5173',
    'http://localhost:3000',
    env.clientOrigin,
  ].filter(Boolean);

  app.use(cors({
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
  }));

  app.options(/(.*)/, cors());

  app.use(helmet());

  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());


  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/jobs", jobsRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
