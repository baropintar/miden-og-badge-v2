import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get("handle") ?? "unknown";

    // Asset dari public
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
          }}
        >
          {/* Background */}
          <img
            src={bg}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Overlay blur */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
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
              gap: 20,
              padding: 40,
              borderRadius: 30,
              background: "rgba(0,0,0,0.6)",
              boxShadow: "0 0 40px rgba(255,122,26,0.6)",
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
                border: "8px solid #ff7a1a",
                objectFit: "cover",
                boxShadow: "0 0 20px rgba(255,122,26,0.7)",
              }}
            />

            {/* Handle */}
            <div
              style={{
                color: "#fff",
                fontSize: 44,
                fontWeight: 800,
                textShadow: "0 0 10px rgba(0,0,0,0.6)",
              }}
            >
              @{handle}
            </div>

            {/* Badge Title */}
            <div
              style={{
                color: "#ff7a1a",
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: "uppercase",
                textShadow: "0 0 15px rgba(255,122,26,0.8)",
              }}
            >
              Miden OG Badge
            </div>
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
