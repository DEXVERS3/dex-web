"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input) return;

    setLoading(true);

    const res = await fetch("/api/dex", {
      method: "POST",
      body: JSON.stringify({ input }),
    });

    const data = await res.json();

    setOutput(data.output);
    setLoading(false);
  };

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <h1>DEX</h1>
      <p>Say what you mean. DEX handles the rest.</p>

      <textarea
        rows={6}
        style={{ width: "100%", marginTop: 20 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type naturally..."
      />

      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        {loading ? "Thinking..." : "Run"}
      </button>

      {output && (
        <div style={{ marginTop: 40 }}>
          <h3>Output</h3>
          <p>{output}</p>
        </div>
      )}
    </main>
  );
}
