import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontendDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(frontendDir, "out");
const publicDir = path.join(frontendDir, "public");

const requiredOutputs = ["_headers", "_redirects", "robots.txt", "sitemap.xml"];

function copyFromPublic(filename) {
  const source = path.join(publicDir, filename);
  const target = path.join(outDir, filename);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing source file: public/${filename}`);
  }

  fs.copyFileSync(source, target);
}

if (!fs.existsSync(outDir)) {
  throw new Error("Build output directory not found: out/");
}

for (const filename of ["_headers", "_redirects"]) {
  copyFromPublic(filename);
}

const missing = requiredOutputs.filter((filename) => !fs.existsSync(path.join(outDir, filename)));

if (missing.length > 0) {
  throw new Error(`Static export is missing required files in out/: ${missing.join(", ")}`);
}

console.log("Static export verified:", requiredOutputs.map((file) => `out/${file}`).join(", "));
