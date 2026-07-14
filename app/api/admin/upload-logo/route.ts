import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { fileName?: string; imageData?: string };

  if (!body.fileName || !body.imageData?.startsWith("data:image/png;base64,")) {
    return NextResponse.json({ error: "A 64x64 PNG logo is required." }, { status: 400 });
  }

  const safeFileName = body.fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!safeFileName.endsWith(".png")) {
    return NextResponse.json({ error: "Logo file must be a PNG." }, { status: 400 });
  }

  const buffer = Buffer.from(body.imageData.replace("data:image/png;base64,", ""), "base64");
  const targetDir = path.join(process.cwd(), "public", "brand", "tools");
  const targetFile = path.join(targetDir, safeFileName);

  await mkdir(targetDir, { recursive: true });
  await writeFile(targetFile, buffer);

  return NextResponse.json({ logo: `/brand/tools/${safeFileName}` });
}
