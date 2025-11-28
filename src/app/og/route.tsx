import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get("handle") ?? "unknown";

    // Edge-safe paths
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
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
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
              borderRadius: 20,
              background: "rgba(0,0,0,0.55)",
            }}
          >
            {/* PFP */}
            <img
              src={pfp}
              alt="pfp"
              style={{
                width: 170,
                height: 170,
                borderRadius: "50%",
                border: "6px solid #ff7a1a",
                objectFit: "cover",
              }}
            />

            {/* Handle */}
            <div
              style={{
                color: "#fff",
                fontSize: 42,
                fontWeight: 700,
                marginTop: 10,
              }}
            >
              @{handle}
            </div>

            {/* Badge Title */}
            <div
              style={{
                color: "#ff7a1a",
                fontSize: 50,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Miden OG Badge
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e: any) {
    console.error(e);
    return new Response("Error generating image", { status: 500 });
  }
}
