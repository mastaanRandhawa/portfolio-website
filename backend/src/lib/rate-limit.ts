import { prisma } from "./prisma.js";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

export async function checkRateLimit(
  ip: string
): Promise<{ success: boolean; remaining: number }> {
  const now = new Date();
  const resetTime = new Date(now.getTime() + WINDOW_MS);

  const existing = await prisma.rateLimitEntry.findUnique({ where: { ip } });

  if (!existing || existing.resetTime < now) {
    await prisma.rateLimitEntry.upsert({
      where: { ip },
      create: { ip, count: 1, resetTime },
      update: { count: 1, resetTime },
    });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  const updated = await prisma.rateLimitEntry.update({
    where: { ip },
    data: { count: existing.count + 1 },
  });

  return { success: true, remaining: MAX_REQUESTS - updated.count };
}
