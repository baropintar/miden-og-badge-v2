import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get("handle") || "unknown";

  const avatar = `https://unavatar.io/twitter/${handle}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",        // WAJIB!!
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a0a0a, #1c1c1c)",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          gap: "30px",            // WAJIB!! (daripada pakai margin)
        }}
      >
        {/* Avatar */}
        <img
          src={avatar}
          width={200}
          height={200}
          style={{
            borderRadius: "100%",
            border: "6px solid #fff",
          }}
        />

        {/* Handle text */}
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 700,
          }}
        >
          @{handle}
        </div>

        {/* Badge label */}
        <div
          style={{
            display: "flex",
            fontSize: 40,
            opacity: 0.8,
          }}
        >
          OG BADGE
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
