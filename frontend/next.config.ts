import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const frontendDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.join(frontendDir, "..");

const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/portfolio-website";
const publicBasePath = isGithubPages ? githubPagesBasePath : "";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: publicBasePath,
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: githubPagesBasePath,
        assetPrefix: `${githubPagesBasePath}/`,
        trailingSlash: true,
      }
    : {}),
  turbopack: {
    root: monorepoRoot,
  },
  images: {
    unoptimized: isGithubPages,
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
  ...(isGithubPages
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
                {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
                },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
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
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
