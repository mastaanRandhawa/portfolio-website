import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const frontendDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.join(frontendDir, "..");

type DeployTarget = "development" | "github-pages" | "cloudflare";

function getDeployTarget(): DeployTarget {
  if (process.env.GITHUB_PAGES === "true") return "github-pages";
  if (process.env.CLOUDFLARE_PAGES === "true" || process.env.CF_PAGES === "1") {
    return "cloudflare";
  }
  return "development";
}

const deployTarget = getDeployTarget();
const isGithubPages = deployTarget === "github-pages";
const isCloudflare = deployTarget === "cloudflare";
const isStaticExport = isGithubPages || isCloudflare;

const githubPagesBasePath = "/portfolio-website";
const publicBasePath = isGithubPages ? githubPagesBasePath : "";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.unsplash.com https://framerusercontent.com",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://www.clarity.ms",
      "frame-src 'self' https://calendly.com https://www.youtube.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: publicBasePath,
    NEXT_PUBLIC_TRAILING_SLASH: isGithubPages ? "true" : "false",
  },
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: isGithubPages,
        ...(isGithubPages
          ? {
              basePath: githubPagesBasePath,
              assetPrefix: `${githubPagesBasePath}/`,
            }
          : {}),
      }
    : {}),
  turbopack: {
    root: monorepoRoot,
  },
  images: {
    // Static export (GitHub Pages + Cloudflare Pages) has no image optimizer server.
    unoptimized: isStaticExport,
    ...(!isStaticExport
      ? { formats: ["image/avif", "image/webp"] as ("image/avif" | "image/webp")[] }
      : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: securityHeaders,
            },
          ];
        },
      }),
};

export default nextConfig;
