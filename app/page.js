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

    const homepageInstruction = `
Take the user's messy input and return the best usable version immediately.

Rules:
- Do not ask follow-up questions.
- Do not explain what you are doing.
- Do not mention prompts, AI, systems, models, or instructions.
- Do not interview the user.
- Make the response useful now.
- Preserve the user's meaning.
- Keep it human, clear, direct, and natural.
- If the user asks for a message, write the message.
- If the user asks for an email, write the email.
- If the user is vague, infer the most likely useful output and move.

User input:
${input}
`;

    try {
      const res = await fetch("/api/dex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: homepageInstruction,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.output || "Something broke.");
      }

      if (!data?.output) {
        throw new Error("No response came back.");
      }

      setOutput(data.output);
    } catch (err) {
      setError("Something did not come back right. Try again.");
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
              style={styles.tryButton}
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

          <p style={styles.price}>$6.95/month. Cancel anytime.</p>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0b0c",
    color: "#f3f3f3",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  hero: {
    padding: "72px 24px 64px",
  },
  wrap: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  brand: {
    fontSize: "48px",
    fontWeight: 800,
    marginBottom: "24px",
  },
  title: {
    fontSize: "56px",
    marginBottom: "12px",
    lineHeight: 1.08,
  },
  copy: {
    fontSize: "20px",
    color: "#b6bcc6",
    marginBottom: "30px",
  },
  tryBox: {
    background: "#111214",
    border: "1px solid #24262b",
    borderRadius: "18px",
    padding: "20px",
    marginBottom: "24px",
  },
  tryLabel: {
    fontSize: "13px",
    letterSpacing: "0.1em",
    color: "#9ca3af",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    background: "#17181c",
    color: "#fff",
    border: "1px solid #2a2d33",
    borderRadius: "12px",
    padding: "14px",
    marginBottom: "12px",
    boxSizing: "border-box",
    fontFamily: "inherit",
    fontSize: "15px",
    lineHeight: 1.5,
  },
  tryButton: {
    background: "#f3f4f6",
    color: "#000",
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    marginBottom: "12px",
    fontWeight: 700,
  },
  outputBox: {
    background: "#0f1012",
    border: "1px solid #202228",
    borderRadius: "12px",
    padding: "14px",
    whiteSpace: "pre-wrap",
  },
  outputText: {
    margin: 0,
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
  },
  errorBox: {
    background: "#2a1111",
    border: "1px solid #5f2525",
    color: "#ffd6d6",
    borderRadius: "10px",
    padding: "10px",
  },
  label: {
    fontSize: "13px",
    color: "#f3f3f3",
    marginBottom: "8px",
    fontWeight: 700,
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#f3f4f6",
    color: "#000",
    padding: "12px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
  },
  secondaryBtn: {
    background: "#141518",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "10px",
    textDecoration: "none",
  },
  price: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#9ca3af",
  },
};
