"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Access denied.");
        setLoading(false);
        return;
      }

      router.push("/studio");
      router.refresh();
    } catch (err) {
      setError("Something broke. Try again.");
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.eyebrow}>Private access</div>
        <h1 style={styles.title}>Enter your access code</h1>
        <p style={styles.copy}>
          Paid users and approved testers enter here.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access code"
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>

        {error ? <p style={styles.error}>{error}</p> : null}
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#0b0b0c",
    color: "#f3f4f6",
    padding: "24px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#111214",
    border: "1px solid #1e2126",
    borderRadius: "22px",
    padding: "28px",
  },
  eyebrow: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#9ca3af",
    marginBottom: "12px",
  },
  title: {
    margin: "0 0 10px",
    fontSize: "38px",
    letterSpacing: "-0.04em",
  },
  copy: {
    margin: "0 0 22px",
    color: "#b6bcc6",
    lineHeight: 1.6,
  },
  form: {
    display: "grid",
    gap: "12px",
  },
  input: {
    background: "#0d0e10",
    color: "#f3f4f6",
    border: "1px solid #262a30",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    background: "#f3f4f6",
    color: "#0b0b0c",
    border: "none",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },
  error: {
    marginTop: "14px",
    color: "#fca5a5",
  },
};
