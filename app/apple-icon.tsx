import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#070d15",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Diamond logo */}
        <div
          style={{
            width: 68,
            height: 68,
            background: "#f59e0b",
            transform: "rotate(45deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: "#070d15",
            }}
          />
        </div>

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              color: "#f8fafc",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: "0.1em",
              lineHeight: 1,
              fontFamily: "sans-serif",
            }}
          >
            E-BENGKEL
          </span>
          <span
            style={{
              color: "#f59e0b",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              lineHeight: 1,
              fontFamily: "monospace",
            }}
          >
            SISTEM PAKAR
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
