"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleCheckout() {
    setCheckoutLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      setError("Checkout did not open. Try again.");
      setCheckoutLoading(false);
    } catch (err) {
      setError("Checkout broke. Try again.");
      setCheckoutLoading(false);
    }
  }

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
        <h1 style={styles.title}>Get access to Spot On!</h1>
        <p style={styles.copy}>
          Subscribe below, or enter an access code if you are an approved tester.
        </p>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={checkoutLoading}
          style={styles.subscribeButton}
        >
          {checkoutLoading ? "Opening checkout..." : "Subscribe — $6.95/month"}
        </button>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>or</span>
          <span style={styles.dividerLine}></span>
        </div>

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
  subscribeButton: {
    width: "100%",
    background: "#f3f4f6",
    color: "#0b0b0c",
    border: "none",
    borderRadius: "12px",
    padding: "15px 16px",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    marginBottom: "20px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "6px 0 20px",
  },
  dividerLine: {
    height: "1px",
    background: "#262a30",
    flex: 1,
  },
  dividerText: {
    color: "#9ca3af",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
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
