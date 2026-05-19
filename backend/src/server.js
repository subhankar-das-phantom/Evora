import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { bootstrapSuperAdmin } from "./common/utils/bootstrapSuperAdmin.js";

const bootstrap = async () => {
  await connectDB();
  await bootstrapSuperAdmin();
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`${env.APP_NAME} backend listening on port ${env.PORT}`);
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
