import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";

export const notFoundHandler = (_req, _res, next) => {
  return next(new AppError("Route not found", 404));
};

export const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message
  });
};

