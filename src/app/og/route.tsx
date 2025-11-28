import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get("handle") ?? "unknown";

    const pfp = `https://unavatar.io/twitter/${handle}`;
    const bg = "/miden.jpg";

    return new ImageResponse(
      (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}>
          <img
            src={bg}
            style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)",
          }} />
          <div style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            padding: 40,
            borderRadius: 20,
            background: "rgba(0,0,0,0.55)",
          }}>
            <img
              src={pfp}
              alt="pfp"
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                border: "6px solid #ff7a1a",
                objectFit: "cover",
              }}
            />
            <div style={{ color: "#fff", fontSize: 36, fontWeight: 700 }}>
              @{handle}
            </div>
            <div style={{
              color: "#ff7a1a",
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}>
              Miden OG Badge
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (err) {
    console.error("OG Badge generation error:", err);
    return new Response("Error generating OG Badge", { status: 500 });
  }
}
