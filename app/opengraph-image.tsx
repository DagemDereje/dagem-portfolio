import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const runtime = "edge";
export const alt = `${SITE_NAME} — Data Scientist`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          backgroundColor: "#0b1120",
          backgroundImage:
            "radial-gradient(circle at 75% 30%, rgba(79,209,197,0.18), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#4fd1c5",
              display: "flex",
            }}
          />
          <span style={{ fontSize: 28, color: "#8792a8", fontFamily: "monospace" }}>
            Data Scientist
          </span>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#e7ecf5",
            lineHeight: 1.1,
            marginBottom: 24,
            display: "flex",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#8792a8",
            maxWidth: 820,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size }
  );
}
