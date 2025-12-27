export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Load words
const words = new Set(
  fs
    .readFileSync(path.join(process.cwd(), "lib", "words.txt"), "utf-8")
    .split("\n")
    .map(w => w.trim().toLowerCase())
    .filter(Boolean)
);

// Load definitions
const definitions: Record<string, string> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "lib", "definitions.json"), "utf-8")
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word")?.toLowerCase();

  if (!word) {
    return NextResponse.json({ valid: false });
  }

  const valid = words.has(word);
  return NextResponse.json({
    word,
    valid,
    definition: valid ? definitions[word] || null : null
  });
}
