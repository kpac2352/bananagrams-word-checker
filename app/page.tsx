"use client";

import { useState } from "react";

type CheckResult = {
  word: string;
  valid: boolean;
  definition: string | null;
};

export default function Home() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const [allowPlurals, setAllowPlurals] = useState(true);
  const [allowShortWords, setAllowShortWords] = useState(false);

  async function checkWord() {
    if (!word.trim()) return;

    setLoading(true);
    setResult(null);

    const response = await fetch(
      `/api/check?word=${encodeURIComponent(word.trim())}&plurals=${allowPlurals}&short=${allowShortWords}`
    );

    const data = (await response.json()) as CheckResult;
    setResult(data);
    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        color: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "64px",
        paddingLeft: "16px",
        paddingRight: "16px",
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "6px" }}>🍌 Word Checker</h1>

      <p style={{ fontSize: "14px", marginBottom: "24px" }}>
        Unofficial Bananagrams tool
      </p>

      <input
        placeholder="ENTER WORD"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") checkWord();
        }}
        style={{
          fontSize: "20px",
          padding: "16px",
          width: "100%",
          maxWidth: "360px",
          textAlign: "center",
          border: "2px solid #000",
          borderRadius: "12px",
          marginBottom: "12px",
        }}
      />

      <button
        onClick={checkWord}
        disabled={loading}
        style={{
          padding: "16px",
          width: "100%",
          maxWidth: "360px",
          fontSize: "18px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Checking…" : "Check Word"}
      </button>

      {/* House rules toggles (UI belongs here, NOT inside checkWord()) */}
      <div style={{ marginTop: "16px", width: "100%", maxWidth: "360px", fontSize: "14px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={allowPlurals}
            onChange={() => setAllowPlurals(!allowPlurals)}
            style={{ marginRight: "8px" }}
          />
          Allow plurals
        </label>

        <label style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={allowShortWords}
            onChange={() => setAllowShortWords(!allowShortWords)}
            style={{ marginRight: "8px" }}
          />
          Allow words under 3 letters
        </label>
      </div>

      {result && (
        <div
          style={{
            width: "100%",
            maxWidth: "360px",
            marginTop: "24px",
            border: "2px solid #000",
            borderRadius: "12px",
            padding: "14px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "22px", fontWeight: "bold", margin: 0 }}>
            {result.valid ? "VALID WORD" : "INVALID WORD"}
          </p>

          {result.valid && result.definition && (
            <p style={{ fontSize: "16px", marginTop: "10px", marginBottom: 0 }}>
              {result.definition}
            </p>
          )}
        </div>
      )}

      <p
        style={{
          marginTop: "40px",
          fontSize: "12px",
          textAlign: "center",
          maxWidth: "360px",
        }}
      >
        Unofficial tool. Not affiliated with the game’s publisher.
      </p>
    </main>
  );
}
