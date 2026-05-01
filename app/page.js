"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.wrap}>
          <div style={styles.brand}>Spot On!</div>

          <h1 style={styles.title}>Say what you mean. Get it back right.</h1>

          <p style={styles.copy}>
            No prompts. No cleanup. Just start.
          </p>

          <div style={styles.proofCard}>
            <div style={styles.userBlock}>
              <div style={styles.label}>You</div>
              <p style={styles.userText}>
                i need to follow up with this guy. dont want to sound annoying.
                we talked last week. he said maybe. i just want to nudge it
                without making it weird
              </p>
            </div>

            <div style={styles.spotBlock}>
              <div style={styles.label}>Spot On!</div>
              <p style={styles.outputText}>
                Just checking in on what we talked about last week.
              </p>
              <p style={styles.outputText}>
                No rush at all — I know timing can be everything. If it still
                makes sense on your end, I’m here. If not, no worries either.
              </p>
              <p style={styles.outputText}>
                Either way, appreciate the conversation.
              </p>
            </div>
          </div>

          <div style={styles.actions}>
            <Link href="/access" style={styles.primaryBtn}>
              Unlock Spot On!
            </Link>

            <Link href="/sample" style={styles.secondaryBtn}>
              See full example
            </Link>
          </div>

          <p style={styles.price}>$6.95/month. Cancel anytime.</p>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.wrap}>
          <h2 style={styles.sectionTitle}>What it does</h2>

          <div style={styles.grid}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Takes messy input</h3>
              <p style={styles.cardText}>
                Say it the way it comes out. Half-formed, rough, unfinished.
                Spot On! works from there.
              </p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Returns usable language</h3>
              <p style={styles.cardText}>
                Emails, messages, copy, follow-ups, ideas — cleaned up without
                sanding off your voice.
              </p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Keeps the thread</h3>
              <p style={styles.cardText}>
                Revise naturally. Shorter. Softer. Sharper. Less salesy. More
                direct. Keep moving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.finalSection}>
        <div style={styles.wrap}>
          <h2 style={styles.finalTitle}>Write like a person.</h2>
          <p style={styles.finalCopy}>
            Spot On! is built for people who know what they mean — they just
            don’t want to fight the machine to get it back right.
          </p>

          <Link href="/access" style={styles.primaryBtn}>
            Unlock Spot On!
          </Link>
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
    borderBottom: "1px solid #1a1a1c",
  },
  wrap: {
    maxWidth: "1040px",
    margin: "0 auto",
  },
  brand: {
    fontSize: "52px",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    color: "#f3f3f3",
    marginBottom: "28px",
  },
  title: {
    fontSize: "64px",
    lineHeight: 1.02,
    letterSpacing: "-0.05em",
    maxWidth: "860px",
    margin: "0 0 18px",
  },
  copy: {
    fontSize: "22px",
    lineHeight: 1.5,
    color: "#b6bcc6",
    maxWidth: "720px",
    margin: "0 0 32px",
  },
  proofCard: {
    background: "#111214",
    border: "1px solid #24262b",
    borderRadius: "22px",
    padding: "22px",
    maxWidth: "820px",
    marginBottom: "28px",
  },
  userBlock: {
    background: "#17181c",
    border: "1px solid #2a2d33",
    borderRadius: "18px",
    padding: "18px 20px",
    marginBottom: "16px",
  },
  spotBlock: {
    background: "#0f1012",
    border: "1px solid #202228",
    borderRadius: "18px",
    padding: "18px 20px",
  },
  label: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#9ca3af",
    marginBottom: "10px",
    fontWeight: 700,
  },
  userText: {
    margin: 0,
    lineHeight: 1.6,
    color: "#f3f3f3",
    fontSize: "17px",
  },
  outputText: {
    margin: "0 0 12px",
    lineHeight: 1.6,
    color: "#f3f3f3",
    fontSize: "17px",
  },
  actions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  primaryBtn: {
    background: "#f3f4f6",
    color: "#0b0b0c",
    padding: "14px 20px",
    borderRadius: "12px",
    fontWeight: 700,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "inline-block",
  },
  secondaryBtn: {
    background: "#141518",
    color: "#f3f4f6",
    border: "1px solid #26282d",
    padding: "14px 20px",
    borderRadius: "12px",
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-block",
  },
  price: {
    marginTop: "12px",
    color: "#9ca3af",
    fontSize: "14px",
  },
  section: {
    padding: "56px 24px",
    borderBottom: "1px solid #1a1a1c",
  },
  sectionTitle: {
    fontSize: "34px",
    letterSpacing: "-0.04em",
    margin: "0 0 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "#111214",
    border: "1px solid #1e2126",
    borderRadius: "18px",
    padding: "22px",
  },
  cardTitle: {
    fontSize: "18px",
    margin: "0 0 10px",
  },
  cardText: {
    margin: 0,
    color: "#b6bcc6",
    lineHeight: 1.6,
  },
  finalSection: {
    padding: "56px 24px 80px",
  },
  finalTitle: {
    fontSize: "38px",
    lineHeight: 1.1,
    letterSpacing: "-0.04em",
    margin: "0 0 14px",
  },
  finalCopy: {
    fontSize: "19px",
    lineHeight: 1.6,
    color: "#b6bcc6",
    maxWidth: "720px",
    margin: "0 0 26px",
  },
};
