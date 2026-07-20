import { ZodError } from "zod";
import { isUniqueViolation, messageForUniqueViolation } from "../utils/dbErrors.js";

export const notFound = (req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (isUniqueViolation(err)) {
    res.status(409).json({
      error: messageForUniqueViolation(err),
    });
    return;
  }

  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? "Internal server error" : err.message,
    details: err.details || undefined,
  });
};
