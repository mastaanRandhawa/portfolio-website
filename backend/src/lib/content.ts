import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { SiteConfig } from "./types.js";

const contentDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../content");

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(contentDir, "site.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteConfig;
}
