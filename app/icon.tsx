import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#070d15",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer amber diamond */}
        <div
          style={{
            width: 20,
            height: 20,
            background: "#f59e0b",
            transform: "rotate(45deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Inner dark cutout */}
          <div
            style={{
              width: 8,
              height: 8,
              background: "#070d15",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
