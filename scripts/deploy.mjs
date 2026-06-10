import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const frontendDir = path.join(rootDir, "frontend");
const outputIndex = path.join(frontendDir, "out", "index.html");

if (!existsSync(outputIndex)) {
  console.error("Missing frontend/out — build must complete before deploy.");
  process.exit(1);
}

console.log("Deploying static export from frontend/ (avoids monorepo workspace root error)...");
execSync("npx wrangler deploy", { cwd: frontendDir, stdio: "inherit" });
