import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import jobsRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";
import verificationRoutes from "./routes/verificationRoutes.js";
import dns from 'dns';
import companyRoutes from './routes/profileRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dns.setDefaultResultOrder('ipv4first');
export const createApp = () => {
  const app = express();

  const allowedOrigins = [
    'https://strata-hire.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  ].filter(Boolean);

  const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl requests, etc)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  // Handle preflight requests
  app.options(/(.*)/, cors(corsOptions));

  // Apply CORS to all routes
  app.use(cors(corsOptions));

  // Security middleware
  app.use(helmet());

  // Body parser middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // Logging middleware
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/jobs", jobsRoutes);
  app.use("/api/verify", verificationRoutes);
  app.use("/api/company", companyRoutes);
  app.use("/api/applications", applicationRoutes);

  // Error handling middleware (must be last)
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
