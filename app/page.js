"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch("/api/dex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: input,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.output || "Something went sideways.");
      }

      if (!data?.output) {
        throw new Error("Nothing came back.");
      }

      setOutput(data.output);
    } catch (err) {
      setError(err.message || "Something did not come back right. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.wrap}>
          <div style={styles.brand}>Spot On!</div>

          <h1 style={styles.title}>Say what you mean. Get it back right.</h1>

          <p style={styles.copy}>No prompts. No cleanup. Just start.</p>

          <div style={styles.tryBox}>
            <div style={styles.tryLabel}>Say it how you’d say it</div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="i need to follow up with this guy. dont want to sound annoying..."
              style={styles.textarea}
            />

            <button
              onClick={handleSubmit}
              style={{
                ...styles.tryButton,
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? "Working..." : "See what comes back"}
            </button>

            {error && <div style={styles.errorBox}>{error}</div>}

            {output && (
              <div style={styles.outputBox}>
                <div style={styles.label}>Spot On!</div>
                <p style={styles.outputText}>{output}</p>
              </div>
            )}
          </div>

          <div style={styles.actions}>
            <Link href="/access" style={styles.primaryBtn}>
              Unlock Spot On!
            </Link>

            <Link href="/sample" style={styles.secondaryBtn}>
              See another example
            </Link>
          </div>

          <p style={styles
