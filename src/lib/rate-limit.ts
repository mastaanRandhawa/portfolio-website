const rateLimit = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

export function checkRateLimit(ip: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: MAX_REQUESTS - entry.count };
}
