import { getCmsData, saveCmsData, type CmsData } from "@/lib/cms-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getCmsData());
}

export async function PUT(request: Request) {
  const data = (await request.json()) as CmsData;
  await saveCmsData(data);

  return NextResponse.json({ ok: true, data: await getCmsData() });
}
