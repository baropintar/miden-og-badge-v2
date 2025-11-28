import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 80,
          fontWeight: "bold",
          color: "orange",
        }}
      >
        Test OG
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
