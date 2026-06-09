import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "E-Bengkel — Sistem Pakar Otomotif";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#070d15",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left amber accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 5,
            height: "100%",
            background: "#f59e0b",
          }}
        />

        {/* Faint top-right amber square */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            background: "rgba(245,158,11,0.07)",
            transform: "rotate(45deg)",
          }}
        />

        {/* Faint bottom-left blue square */}
        <div
          style={{
            position: "absolute",
            bottom: -250,
            left: 60,
            width: 500,
            height: 500,
            background: "rgba(91,138,177,0.06)",
            transform: "rotate(30deg)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 80px 52px 96px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Top: Logo bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "#f59e0b",
                transform: "rotate(45deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 14, height: 14, background: "#070d15" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span
                style={{
                  color: "#f8fafc",
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  lineHeight: 1,
                }}
              >
                E-BENGKEL
              </span>
              <span
                style={{
                  color: "#f59e0b",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  fontFamily: "monospace",
                }}
              >
                SISTEM PAKAR OTOMOTIF
              </span>
            </div>
          </div>

          {/* Middle: Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span
              style={{
                color: "#5b8ab1",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.3em",
                fontFamily: "monospace",
              }}
            >
              CERTAINTY FACTOR ENGINE
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 0.88 }}>
              <span
                style={{
                  color: "#f8fafc",
                  fontSize: 110,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
              >
                TEMUKAN
              </span>
              <div style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
                <span
                  style={{
                    color: "#f8fafc",
                    fontSize: 110,
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                  }}
                >
                  LEVEL
                </span>
                <span
                  style={{
                    color: "#f59e0b",
                    fontSize: 110,
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                  }}
                >
                  SUPPORT
                </span>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {/* Stats */}
            <div style={{ display: "flex", gap: 48 }}>
              {[
                { n: "13", label: "RULES IF-THEN" },
                { n: "5", label: "LEVEL SUPPORT" },
                { n: "9", label: "SKALA CF" },
              ].map(({ n, label }) => (
                <div
                  key={label}
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <span
                    style={{
                      color: "#f59e0b",
                      fontSize: 48,
                      fontWeight: 900,
                      lineHeight: 1,
                      fontFamily: "monospace",
                    }}
                  >
                    {n}
                  </span>
                  <span
                    style={{
                      color: "#475569",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CF Formula box */}
            <div
              style={{
                background: "#0d1b2e",
                border: "1px solid rgba(245,158,11,0.35)",
                borderRadius: 12,
                padding: "18px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  color: "#475569",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  fontFamily: "monospace",
                }}
              >
                FORMULA INFERENSI
              </span>
              <span
                style={{
                  color: "#b1d4e8",
                  fontSize: 13,
                  fontFamily: "monospace",
                  lineHeight: 1.7,
                }}
              >
                CF_final = min(CF_m, CF_k, CF_p){"\n"}
              </span>
              <span
                style={{
                  color: "#f59e0b",
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
              >
                × CF_rule
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
