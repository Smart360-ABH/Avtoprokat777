import app from "./app";
import { logger } from "./lib/logger";

const PORT = Number(process.env.PORT) || 3000;

if (Number.isNaN(PORT) || PORT <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

// Bind explicitly to 0.0.0.0 so external services (Render) can access the server.
app.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port: PORT }, "Server listening");
});
