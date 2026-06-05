import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";

export const healthRoutes = new Hono();

healthRoutes.get("/health", async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return c.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return c.json(
      {
        status: "degraded",
        database: "disconnected",
        timestamp: new Date().toISOString(),
      },
      503
    );
  }
});
