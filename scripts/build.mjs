import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const isStaticExport = process.env.STATIC_EXPORT === "1";

const npm = (args) =>
  execSync(`npm ${args}`, { stdio: "inherit", cwd: rootDir, shell: true });

if (isStaticExport) {
  console.log("STATIC_EXPORT=1 — building frontend static export only");
  npm("run build --prefix frontend");
} else {
  npm("run build --prefix backend && npm run build --prefix frontend");
}
