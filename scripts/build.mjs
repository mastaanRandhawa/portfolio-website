import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const isCloudflare =
  process.env.CF_PAGES === "1" || process.env.CLOUDFLARE_PAGES === "true";

const npm = (args) =>
  execSync(`npm ${args}`, { stdio: "inherit", cwd: rootDir, shell: true });

if (isCloudflare) {
  console.log("Cloudflare Pages detected — building frontend static export only");
  npm("run build --prefix frontend");
} else {
  npm("run build --prefix backend && npm run build --prefix frontend");
}
