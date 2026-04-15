import Link from "next/link";

export const metadata = {
  title: "Spot On!",
  description: "Say what you mean. Get it back right.",
};

export default function HomePage() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.wrap}>
          <div style={styles.eyebrow}>Spot On</div>
          <h1 style={styles.title}>Say what you mean. Get it back right.</h1>
          <p style={styles.copy}>
            Spot On is built for people who already know what they want to say,
            but don’t want to fight with the machine to get there.
          </p>

          <div style={styles.actions}>
            <Link href="/access" style={styles.primaryBtn}>
              Get access
            </Link>
            <Link href="/sample" style={styles.secondaryBtn}>
              See sample
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.wrap}>
          <h2 style={styles.sectionTitle}>What it does</h2>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Natural input</h3>
              <p style={styles.cardText}>
                Write like a person. No prompt scaffolding. No fake ceremony.
              </p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Sharper return</h3>
              <p style={styles.cardText}>
                The app responds cleanly, directly, and without corporate fog.
              </p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Fast revision</h3>
              <p style={styles.cardText}>
                Tighten, cut, push, soften, sharpen. Keep moving without losing the thread.
              </p>
            </div>
          </div>
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
    padding: "96px 24px 72px",
    borderBottom: "1px solid #1a1a1c",
  },
  wrap: {
    maxWidth: "1040px",
    margin: "0 auto",
  },
  eyebrow: {
    fontSize: "13px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: "18px",
  },
  title: {
    fontSize: "64px",
    lineHeight: 1.02,
    letterSpacing: "-0.05em",
    maxWidth: "820px",
    margin: "0 0 18px",
  },
  copy: {
    fontSize: "20px",
    lineHeight: 1.6,
    color: "#b6bcc6",
    maxWidth: "720px",
    margin: "0 0 32px",
  },
  actions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#f3f4f6",
    color: "#0b0b0c",
    padding: "14px 20px",
    borderRadius: "12px",
    fontWeight: 700,
    textDecoration: "none",
  },
  secondaryBtn: {
    background: "#141518",
    color: "#f3f4f6",
    border: "1px solid #26282d",
    padding: "14px 20px",
    borderRadius: "12px",
    fontWeight: 700,
    textDecoration: "none",
  },
  section: {
    padding: "56px 24px 80px",
  },
  sectionTitle: {
    fontSize: "28px",
    letterSpacing: "-0.03em",
    marginBottom: "22px",
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
};
