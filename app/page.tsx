"use client";

import { useState } from "react";

export default function Home() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<string | null>(null);

async function checkWord() {
  if (!word) return;

  const response = await fetch(`/api/check?word=${word}`);
  const data = await response.json();

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

      <p style={{ fontSize: "14px", color: "#555", marginBottom: "24px" }}>
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
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Check Word
      </button>

      {result && (
        <p style={{
          marginTop: "24px",
          fontSize: "22px",
          color: result === "valid" ? "green" : "red"
        }}>
          {result === "valid" ? "✅ Valid Word" : "❌ Invalid Word"}
        </p>
      )}

      <p style={{
        marginTop: "40px",
        fontSize: "12px",
        color: "#777",
        textAlign: "center",
        maxWidth: "300px"
      }}>
        Unofficial tool. Not affiliated with the game’s publisher.
      </p>
    </main>
  );
}
