import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get("handle") ?? "unknown";

    const bg = new URL("/miden.jpg", import.meta.url).toString();
    const pfp = new URL("/default-pfp.png", import.meta.url).toString();

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "sans-serif",
            position: "relative",
            background: "#000",
          }}
        >
          {/* Background image */}
          <img
            src={bg}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.5)",
            }}
          />

          {/* Overlay gradient */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
            }}
          />

          {/* Badge container */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 25,
              padding: 50,
              borderRadius: 30,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 50px rgba(255,122,26,0.6)",
            }}
          >
            {/* PFP */}
            <img
              src={pfp}
              alt="pfp"
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                border: "6px solid #ff7a1a",
                objectFit: "cover",
                boxShadow: "0 0 30px rgba(255,122,26,0.8)",
              }}
            />

            {/* Handle */}
            <div
              style={{
                color: "#fff",
                fontSize: 46,
                fontWeight: 800,
                textShadow: "0 0 15px rgba(0,0,0,0.7), 0 0 8px #ff7a1a",
              }}
            >
              @{handle}
            </div>

            {/* Badge Title */}
            <div
              style={{
                color: "#ff7a1a",
                fontSize: 56,
                fontWeight: 900,
                letterSpacing: 4,
                textTransform: "uppercase",
                textShadow: "0 0 20px #ff7a1a, 0 0 10px rgba(0,0,0,0.7)",
              }}
            >
              Miden OG Badge
            </div>

            {/* Optional decoration */}
            <div
              style={{
                width: "80%",
                height: 2,
                background: "rgba(255,122,26,0.5)",
                marginTop: 10,
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response("Error generating image", { status: 500 });
  }
}
