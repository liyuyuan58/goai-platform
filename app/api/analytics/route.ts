import { trackPageView } from "@/lib/cms-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { pathname?: string };
  const pathname = body.pathname?.startsWith("/") ? body.pathname : "/";
  await trackPageView(pathname);

  return NextResponse.json({ ok: true });
}

