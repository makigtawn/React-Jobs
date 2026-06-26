import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
// import applicationRoutes from "./routes/applicationRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"; 
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";

export const createApp = () => {
  const app = express();

  const allowedOrigins = [
    'http://strata-backend-ri59.onrender.com', 
  ];
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS'));
      }
    },
    credentials: true
  }));
  app.use(helmet());
  app.use(
    cors({
      origin: env.clientOrigin,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  // app.use("/api/applications", applicationRoutes);
  app.use("/api/jobs", jobRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
