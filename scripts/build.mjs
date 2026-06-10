import { execSync } from "node:child_process";

const isCloudflare =
  process.env.CF_PAGES === "1" || process.env.CLOUDFLARE_PAGES === "true";

if (isCloudflare) {
  console.log("Cloudflare Pages detected — building frontend static export only");
  execSync("npm run build -w frontend", { stdio: "inherit" });
} else {
  execSync("npm run build -w backend && npm run build -w frontend", {
    stdio: "inherit",
    shell: true,
  });
}
