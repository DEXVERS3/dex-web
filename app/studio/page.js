"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [pendingNewThread, setPendingNewThread] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("spoton_conversations");

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.length > 0) {
        setConversations(parsed);
        setActiveId(parsed[0].id);
      }
    }

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    localStorage.setItem(
      "spoton_conversations",
      JSON.stringify(conversations)
    );
  }, [conversations, hasLoaded]);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleRun = async () => {
    if (!input.trim() || !activeConversation) return;

    const trimmedInput = input.trim();
    const userMessage = { role: "user", content: trimmedInput };

    const updatedAfterUser = conversations.map((conversation) => {
      if (conversation.id === activeId) {
        const updatedTitle =
          conversation.messages.length === 0
            ? trimmedInput.slice(0, 40)
            : conversation.title;

        return {
          ...conversation,
          title: updatedTitle || "New Workspace",
          updatedAt: Date.now(),
          messages: [...conversation.messages, userMessage],
        };
      }

      return conversation;
    });

    setConversations(updatedAfterUser);
    setInput("");

    const res = await fetch("/api/dex", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: trimmedInput }),
    });

    const data = await res.json();

    const assistantMessage = {
      role: "assistant",
      content: data.output,
    };

    const updatedAfterAssistant = updatedAfterUser.map((conversation) => {
      if (conversation.id === activeId) {
        return {
          ...conversation,
          updatedAt: Date.now(),
          messages: [...conversation.messages, assistantMessage],
        };
      }

      return conversation;
    });

    const reordered = reorderConversations(updatedAfterAssistant, activeId);
    setConversations(reordered);
  };

  const handleNewThread = () => {
    if (activeConversation && activeConversation.messages.length > 0) {
      setPendingNewThread(true);
      setShowContinuePrompt(true);
      return;
    }

    createNewThread();
  };

  const handleContinueYes = () => {
    setShowContinuePrompt(false);
    setPendingNewThread(false);
  };

  const handleContinueNo = () => {
    setShowContinuePrompt(false);

    if (pendingNewThread) {
      createNewThread();
      setPendingNewThread(false);
    }
  };

  const createNewThread = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Workspace",
      updatedAt: Date.now(),
      messages: [],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveId(newConversation.id);
    setInput("");
  };

  const handleSelectConversation = (id) => {
    if (id === activeId) return;
    setActiveId(id);
    setInput("");
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

        <div style={styles.threadList}>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation.id)}
              style={{
                ...styles.threadItem,
                ...(conversation.id === activeId ? styles.threadItemActive : {}),
              }}
            >
              <div style={styles.threadTitle}>{conversation.title}</div>
            </div>
          ))}
        </div>
      </aside>

      <main style={styles.main}>
        {showContinuePrompt && (
          <div style={styles.promptOverlay}>
            <div style={styles.promptBox}>
              <div style={styles.promptTitle}>Continue where you left off?</div>
              <div style={styles.promptActions}>
                <button onClick={handleContinueYes} style={styles.promptPrimary}>
                  Yes
                </button>
                <button onClick={handleContinueNo} style={styles.promptSecondary}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={styles.streamOuter}>
          <div style={styles.streamInner}>
            {(!activeConversation ||
              activeConversation.messages.length === 0) && (
              <div style={styles.emptyState}>
                <div style={styles.emptyTitle}>Spot On!</div>
                <div style={styles.emptyText}>Say what you mean.</div>
              </div>
            )}

            {activeConversation?.messages.map((msg, i) => (
              <div key={i} style={styles.messageWrap}>
                <div style={styles.unifiedText}>{msg.content}</div>
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

function reorderConversations(conversations, activeId) {
  const activeConversation = conversations.find((c) => c.id === activeId);
  const remaining = conversations.filter((c) => c.id !== activeId);

  if (!activeConversation) return conversations;

  return [activeConversation, ...remaining];
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
    width: "240px",
    borderRight: "1px solid #17181a",
    padding: "24px 18px",
    backgroundColor: "#090909",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    overflowY: "auto",
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

  threadList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "4px",
  },

  threadItem: {
    padding: "12px 12px",
    borderRadius: "12px",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "1px solid transparent",
  },

  threadItemActive: {
    backgroundColor: "#141518",
    border: "1px solid #26282d",
  },

  threadTitle: {
    fontSize: "13px",
    lineHeight: 1.35,
    color: "#d4d4d8",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    position: "relative",
  },

  promptOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },

  promptBox: {
    backgroundColor: "#111214",
    border: "1px solid #23262b",
    borderRadius: "18px",
    padding: "24px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },

  promptTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#f3f4f6",
    marginBottom: "18px",
    letterSpacing: "-0.02em",
  },

  promptActions: {
    display: "flex",
    gap: "12px",
  },

  promptPrimary: {
    backgroundColor: "#f3f4f6",
    color: "#0b0b0c",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 700,
  },

  promptSecondary: {
    backgroundColor: "#1b1d21",
    color: "#f8f8f8",
    border: "1px solid #2a2d31",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 700,
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
