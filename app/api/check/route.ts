export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const words = new Set(
  fs
    .readFileSync(path.join(process.cwd(), "lib/words.txt"), "utf-8")
    .split("\n")
    .map(w => w.trim().toLowerCase())
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word")?.toLowerCase();

  if (!word) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({
    word,
    valid: words.has(word)
  });
}
