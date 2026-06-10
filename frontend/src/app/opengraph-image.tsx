import { ImageResponse } from "next/og";
import { fetchSiteConfig } from "@/lib/api";

export const alt = "Doxa Studios — Professional Web Design & Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const site = await fetchSiteConfig();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1a1a1a",
          color: "#f5f4f0",
        }}
      >
        <div
          style={{
            fontSize: 72,
            letterSpacing: "0.08em",
            fontFamily: "Georgia, serif",
            marginBottom: 24,
          }}
        >
          DOXA STUDIOS
        </div>
        <div
          style={{
            fontSize: 32,
            letterSpacing: "0.04em",
            opacity: 0.85,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          doxastudios.ca
        </div>
      </div>
    ),
    { ...size },
  );
}
