"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleRun = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("/api/dex", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();

    const assistantMessage = {
      role: "assistant",
      content: data.output,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setInput("");
  };

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <h1>DEX</h1>

      <div style={{ marginBottom: 20 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{msg.role === "user" ? "You:" : "DEX:"}</strong>
            <div>{msg.content}</div>
          </div>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={handleRun}>Run</button>
    </div>
  );
}
