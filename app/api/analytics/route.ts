import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await request.json();
  } catch {
    // Ignore malformed analytics payloads. GA4 remains the source of truth for production analytics.
  }

  return NextResponse.json({ ok: true, persisted: false });
}
