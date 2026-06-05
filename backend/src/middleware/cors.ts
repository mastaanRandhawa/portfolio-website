import type { Env } from "../config/env.js";
import { getCorsOrigins } from "../config/env.js";

export function corsHeaders(origin: string | undefined, env: Env): Record<string, string> {
  const allowed = getCorsOrigins(env);
  const isAllowed =
    !origin ||
    allowed.includes(origin) ||
    allowed.some((o) => origin.startsWith(o));

  if (!isAllowed) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin ?? allowed[0] ?? "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}
