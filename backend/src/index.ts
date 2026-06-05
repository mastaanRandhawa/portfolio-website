import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { loadEnv } from "./config/env.js";
import { corsHeaders } from "./middleware/cors.js";
import { prisma } from "./lib/prisma.js";
import { healthRoutes } from "./routes/health.js";
import { contentRoutes } from "./routes/content.js";
import { createContactRoutes } from "./routes/contact.js";

const env = loadEnv();
const app = new Hono();

app.use("*", async (c, next) => {
  const origin = c.req.header("origin");
  const headers = corsHeaders(origin, env);
  Object.entries(headers).forEach(([key, value]) => c.header(key, value));

  if (c.req.method === "OPTIONS") {
    return c.body(null, 204);
  }

  await next();
});

app.use("*", async (c, next) => {
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
  await next();
});

app.route("/", healthRoutes);
app.route("/", contentRoutes);
app.route("/", createContactRoutes(env));

app.notFound((c) => c.json({ error: "Not found" }, 404));

app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

const port = env.PORT;

async function shutdown() {
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log(`Backend server running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });
