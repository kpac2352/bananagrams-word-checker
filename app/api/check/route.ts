export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const words = new Set(
  fs
    .readFileSync(path.join(process.cwd(), "lib", "words.txt"), "utf-8")
    .split("\n")
    .map(w => w.trim().toLowerCase())
    .filter(Boolean)
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word")?.toLowerCase();

  if (!word) {
    return NextResponse.json({ valid: false });
  }

  const valid = words.has(word);

  let definition = null;

  if (valid) {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();
      definition = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? null;
    } catch {
      definition = null;
    }
  }
const allowPlurals = searchParams.get("plurals") === "true";
const allowShort = searchParams.get("short") === "true";

if (!allowShort && word.length < 3) {
  return NextResponse.json({ word, valid: false });
}

if (!allowPlurals && word.endsWith("s")) {
  return NextResponse.json({ word, valid: false });
}
  return NextResponse.json({
    word,
    valid,
    definition
  });
}
