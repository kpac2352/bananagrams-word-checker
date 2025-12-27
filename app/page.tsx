"use client";

import { useState } from "react";

export default function Home() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<string | null>(null);

const [allowPlurals, setAllowPlurals] = useState(true);
const [allowShortWords, setAllowShortWords] = useState(false);

async function checkWord() {
  if (!word) return;

  const response = await fetch(
  `/api/check?word=${word}&plurals=${allowPlurals}&short=${allowShortWords}`
);
  const data = await response.json();
<div style={{ marginTop: "16px", fontSize: "14px" }}>
  <label>
    <input
      type="checkbox"
      checked={allowPlurals}
      onChange={() => setAllowPlurals(!allowPlurals)}
    />{" "}
    Allow plurals
  </label>
  <br />
  <label>
    <input
      type="checkbox"
      checked={allowShortWords}
      onChange={() => setAllowShortWords(!allowShortWords)}
    />{" "}
    Allow words under 3 letters
  </label>
</div>

  setResult(data.valid ? "valid" : "invalid");
}


  return (
    <main style={{
      minHeight: "100vh",
      background: "#FFF9E6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "80px",
      fontFamily: "system-ui"
    }}>
      <h1 style={{ fontSize: "32px", marginBottom: "4px" }}>
        🍌 Word Checker
      </h1>

      <p style={{ fontSize: "14px", color: "#000000ff", marginBottom: "24px" }}>
        Unofficial Bananagrams tool
      </p>

      <input
        placeholder="ENTER WORD"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        style={{
          fontSize: "20px",
          padding: "16px",
          width: "90%",
          maxWidth: "320px",
          textAlign: "center",
          border: "2px solid #000"
          marginBottom: "12px"
        }}
      />

      <button
        onClick={checkWord}
        style={{
          padding: "14px",
          width: "90%",
          maxWidth: "320px",
          fontSize: "18px",
          background: "#000",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
      >
        Check Word
      </button>

{result && (
  <div style={{ marginTop: "24px", textAlign: "center" }}>
    <p style={{
      fontSize: "22px",
      color: result.valid ? "green" : "red",
      fontWeight: "bold"
    }}>
      {result.valid ? "✅ Valid Word" : "❌ Invalid Word"}
    </p>
    {result.definition && (
      <p style={{ fontSize: "16px", color: "#000000ff", marginTop: "8px" }}>
        {result.definition}
      </p>
    )}
  </div>
)}

      <p style={{
        marginTop: "40px",
        fontSize: "12px",
        color: "#000000ff",
        textAlign: "center",
        maxWidth: "300px"
      }}>
        Unofficial tool. Not affiliated with the game’s publisher.
      </p>
    </main>
  );
}
