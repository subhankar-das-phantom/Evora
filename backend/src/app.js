import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import { apiRateLimiter } from "./common/middlewares/rateLimiter.js";
import { notFoundHandler, errorHandler } from "./common/middlewares/errorHandler.js";
import { sendSuccess } from "./common/utils/response.js";
import { authModule } from "./modules/auth/index.js";
import { usersModule } from "./modules/users/index.js";
import { eventsModule } from "./modules/events/index.js";
import { bookingsModule } from "./modules/bookings/index.js";
import { mediaModule } from "./modules/media/index.js";
import { adminModule } from "./modules/admin/index.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet());

const allowedOrigins =
  env.CORS_ORIGIN === "*"
    ? "*"
    : env.CORS_ORIGIN.split(",").map((value) => value.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (allowedOrigins === "*") {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(apiRateLimiter);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  return sendSuccess(res, `${env.APP_NAME} backend is running`, {
    service: env.APP_NAME,
    status: "ok"
  });
});

const modules = [authModule, usersModule, eventsModule, bookingsModule, mediaModule, adminModule];
for (const moduleEntry of modules) {
  app.use(`/api/v1${moduleEntry.basePath}`, moduleEntry.router);
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
