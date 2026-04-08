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
      headers: { "Content-Type": "application/json" },
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
    <div style={styles.container}>
      
      {/* LEFT PANEL (future conversations) */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarTitle}>DEX</div>
        <div style={styles.sidebarItem}>New Thread</div>
      </div>

      {/* MAIN WORKSPACE */}
      <div style={styles.main}>
        
        {/* CONVERSATION STREAM */}
        <div style={styles.stream}>
          {messages.map((msg, i) => (
            <div key={i} style={styles.messageBlock}>
              <div
                style={
                  msg.role === "user"
                    ? styles.userText
                    : styles.dexText
                }
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <div style={styles.inputBar}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type naturally..."
            style={styles.textarea}
            rows={2}
          />
          <button onClick={handleRun} style={styles.button}>
            Run
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#0e0e0e",
    color: "#eaeaea",
    fontFamily: "system-ui",
  },

  sidebar: {
    width: "220px",
    borderRight: "1px solid #1a1a1a",
    padding: "20px",
  },

  sidebarTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
  },

  sidebarItem: {
    fontSize: "14px",
    color: "#aaa",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  stream: {
    padding: "40px",
    overflowY: "auto",
    flex: 1,
  },

  messageBlock: {
    marginBottom: "18px",
    lineHeight: 1.6,
  },

  userText: {
    fontWeight: 600,
    color: "#ffffff",
  },

  dexText: {
    color: "#b5b5b5",
  },

  inputBar: {
    borderTop: "1px solid #1a1a1a",
    padding: "20px",
    display: "flex",
    gap: "10px",
  },

  textarea: {
    flex: 1,
    backgroundColor: "#151515",
    color: "#eaeaea",
    border: "1px solid #222",
    padding: "10px",
    borderRadius: "6px",
    resize: "none",
  },

  button: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
