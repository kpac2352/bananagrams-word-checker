export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const words = new Set(
  fs
    .readFileSync(path.join(process.cwd(), "lib", "words.txt"), "utf-8")
    .split("\n")
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean)
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawWord = searchParams.get("word");

  const word = rawWord?.trim().toLowerCase();
  if (!word) {
  return NextResponse.json({ word: "", valid: false, definition: null });
}

  const allowPlurals = searchParams.get("plurals") === "true";
  const allowShort = searchParams.get("short") === "true";

  // House rule: minimum length (common word-game rule)
  if (!allowShort && word.length < 3) {
    return NextResponse.json({ word, valid: false, definition: null });
  }

  // House rule: plurals (safer version)
  // If plurals are not allowed, reject simple "s" plural ONLY when the singular exists.
  if (!allowPlurals && word.endsWith("s") && word.length > 3) {
    const singular = word.slice(0, -1);
    if (words.has(singular)) {
      return NextResponse.json({ word, valid: false, definition: null });
    }
  }

  const valid = words.has(word);

  let definition: string | null = null;
  if (valid) {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      definition =
        data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? null;
    } catch {
      definition = null;
    }
  }

  return NextResponse.json({ word, valid, definition });
}