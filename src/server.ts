import { app } from "./app.js";
import { loadEnv } from "./config/env.js";
import { createPool } from "./database/pool.js";

const env = loadEnv();
const pool = createPool(env.databaseUrl);

async function startServer() {
  await pool.query("SELECT 1");

  app.listen(env.port, () => {
    console.log(`Media Forge API listening on port ${env.port}`);
  });
}

startServer().catch(async (error) => {
  console.error("Failed to start server: ", error);

  await pool.end();

  process.exitCode = 1;
});
