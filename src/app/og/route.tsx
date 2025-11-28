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
          border: "6px solid #ff7b00",
          boxShadow: "0 0 20px #ff7b00, 0 0 40px #ff7b00",
          color: "purple",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          gap: "30px",            // WAJIB!! (daripada pakai margin)
        }}
      >
        {/* Avatar */}
        <img
          src={avatar}
          width={400}
          height={400}
          style={{
            borderRadius: "200%",
            border: "6px solid #ff7b00",
            boxShadow: "0 0 20px #ff7b00, 0 0 40px #ff7b00",

          }}
        />

        {/* Handle text */}
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 700,
            color: "orange",
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
            color: "orange",
          }}
        >
         MIDEN OG BADGE
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
