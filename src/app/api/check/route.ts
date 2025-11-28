import { NextResponse } from "next/server";
import { eligible } from "@/lib/eligible";

export async function POST(req: Request) {
  try {
    const { handle } = await req.json();
    if (!handle || typeof handle !== "string") {
      return NextResponse.json({ eligible: false, error: "Invalid handle" }, { status: 400 });
    }

    const normalized = handle.trim().toLowerCase();
    const isEligible = eligible.includes(normalized);

    return NextResponse.json({ eligible: isEligible });
  } catch (e) {
    return NextResponse.json({ eligible: false, error: "Invalid request format" }, { status: 400 });
  }
}
