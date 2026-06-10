import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontendDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "frontend"
);

console.log("Uploading version from frontend/...");
execSync("npx wrangler versions upload", { cwd: frontendDir, stdio: "inherit" });
