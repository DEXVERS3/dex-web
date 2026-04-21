"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // LOAD LAST SESSION
  useEffect(() => {
    const saved = localStorage.getItem("spoton_messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // SAVE SESSION ON CHANGE
  useEffect(() => {
    localStorage.setItem("spoton_messages", JSON.stringify(messages));
  }, [messages]);

  const handleRun = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

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

  const handleNewThread = () => {
    localStorage.removeItem("spoton_messages");
    setMessages([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleRun();
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>Spot On!</div>

        <div onClick={handleNewThread} style={styles.sidebarAction}>
          New Thread
        </div>
      </aside>

      <main style={styles.main}>
        <div style={styles.streamOuter}>
          <div style={styles.streamInner}>
            {messages.length === 0 && (
              <div style={styles.emptyState}>
                <div style={styles.emptyTitle}>Spot On!</div>
                <div style={styles.emptyText}>Say what you mean.</div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} style={styles.messageWrap}>
                <div style={styles.unifiedText}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.inputShell}>
          <div style={styles.inputInner}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type naturally..."
              rows={2}
              style={styles.textarea}
            />
            <button onClick={handleRun} style={styles.button}>
              Run
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#0b0b0c",
    color: "#e8e8e8",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  sidebar: {
    width: "220px",
    borderRight: "1px solid #17181a",
    padding: "24px 18px",
    backgroundColor: "#090909",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  brand: {
    fontSize: "28px",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    color: "#f3f3f3",
  },

  sidebarAction: {
    fontSize: "14px",
    color: "#a1a1aa",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },

  streamOuter: {
    flex: 1,
    overflowY: "auto",
    padding: "36px 28px 20px",
  },

  streamInner: {
    maxWidth: "780px",
    margin: "0 auto",
    width: "100%",
  },

  emptyState: {
    paddingTop: "10px",
  },

  emptyTitle: {
    fontSize: "40px",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    color: "#f5f5f5",
    marginBottom: "8px",
  },

  emptyText: {
    fontSize: "16px",
    color: "#9ca3af",
  },

  messageWrap: {
    marginBottom: "16px",
    lineHeight: 1.7,
  },

  unifiedText: {
    color: "#d4d4d8",
    fontSize: "15px",
    letterSpacing: "-0.01em",
    whiteSpace: "pre-wrap",
  },

  inputShell: {
    borderTop: "1px solid #17181a",
    padding: "16px 20px 18px",
    backgroundColor: "#0b0b0c",
  },

  inputInner: {
    maxWidth: "780px",
    margin: "0 auto",
    display: "flex",
    gap: "12px",
    alignItems: "flex-end",
  },

  textarea: {
    flex: 1,
    backgroundColor: "#111214",
    color: "#f3f4f6",
    border: "1px solid #1f2226",
    padding: "14px 16px",
    borderRadius: "12px",
    resize: "none",
    outline: "none",
    fontSize: "15px",
    lineHeight: 1.45,
    minHeight: "56px",
  },

  button: {
    backgroundColor: "#1b1d21",
    color: "#f8f8f8",
    border: "1px solid #2a2d31",
    padding: "14px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },
};
