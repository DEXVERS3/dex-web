import Link from "next/link";

export const metadata = {
  title: "Spot On! Sample",
  description: "See how Spot On! makes sense of messy input.",
};

export default function SamplePage() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.wrap}>
          <div style={styles.brand}>Spot On!</div>

          <h1 style={styles.title}>Start anywhere. It keeps up.</h1>

          <p style={styles.copy}>
            No prompts. No setup. No explaining how to talk to it. Just say what
            you’re thinking — even if it’s messy.
          </p>

          <div style={styles.actions}>
            <Link href="/access" style={styles.primaryBtn}>
              Get access
            </Link>
            <Link href="/" style={styles.secondaryBtn}>
              Back home
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.wrap}>
          <div style={styles.chatBlock}>
            <ChatPair
              user="tarantino early stuff. before he was big. not film school. what was that"
              assistant={[
                "Before Quentin Tarantino became famous, he was self-taught, learning by watching countless movies while working at a video rental store called Video Archives in California. He absorbed a wide range of film styles and genres, which deeply influenced his storytelling. During this time, he wrote original screenplays, some of which were sold but not directed by him (like “True Romance” and “Natural Born Killers”). His first directed film, “Reservoir Dogs,” came after this period. Tarantino’s early work was shaped by hands-on experience, scriptwriting, and a deep love of movies—not formal film school.",
              ]}
            />

            <ChatPair
              user="gym opening email. busy people. not cheesy. fast read"
              assistant={[
                "Subject: New Gym Built for Busy Schedules",
                "Hi [Name],",
                "We’re open. [Gym Name] is designed for busy people who want efficient, effective workouts without the hassle.",
                "- 24/7 access",
                "- Focused classes",
                "- Quality equipment",
                "- No crowds",
                "Drop by for a quick tour or join online in under 2 minutes.",
                "Your time, your pace.",
                "[Link to sign up]",
                "[Your Name]",
                "[Gym Name] Team",
              ]}
            />

            <ChatPair
              user="make it stronger. more urgency but not pushy"
              assistant={[
                "Subject: Your New Gym Is Ready—Start Maximizing Your Time Now",
                "Hi [Name],",
                "We’re officially open—and [Gym Name] was built specifically for busy people who need fast, effective workouts that fit seamlessly into their day.",
                "- 24/7 access, whenever you have a moment",
                "- Targeted classes that deliver real results",
                "- Top-tier equipment ready to use",
                "- No crowds, no waiting—just efficient training",
                "Don’t wait to take control of your fitness. Stop by for a quick tour or join online in under 2 minutes.",
                "Your time is valuable—make every minute count.",
                "[Link to sign up]",
                "[Your Name]",
                "[Gym Name] Team",
              ]}
            />

            <ChatPair
              user="now make it feel more premium. like not cheap gym"
              assistant={[
                "Subject: Your Exclusive Gym Awaits — Open Now",
                "Hi [Name],",
                "[Gym Name] is now open—crafted for busy professionals who expect excellence and efficiency in every workout.",
                "- 24/7 access to a state-of-the-art facility",
                "- Precision-led classes designed for maximum impact",
                "- Premium equipment and upscale amenities",
                "- Spacious, serene environment—no crowds, just focus",
                "Take a private tour or join online in under 2 minutes.",
                "Experience fitness elevated.",
                "[Link to sign up]",
                "[Your Name]",
                "[Gym Name] Team",
              ]}
            />

            <ChatPair
              user="shorter"
              assistant={[
                "Subject: Your Exclusive Gym Is Open",
                "Hi [Name],",
                "[Gym Name] is open—designed for busy professionals who demand quality and results.",
                "- 24/7 access to premium equipment",
                "- Precision classes for maximum impact",
                "- Spacious, upscale environment—no crowds",
                "Book a private tour or join online in under 2 minutes.",
                "Elevate your fitness.",
                "[Link to sign up]",
                "[Your Name]",
                "[Gym Name] Team",
              ]}
            />

            <ChatPair
              user="explain crypto to a 12 year old"
              assistant={[
                "Crypto is like digital money you can send and receive over the internet without needing banks. Imagine a special notebook called a blockchain that everyone shares and checks to make sure no one cheats or spends the same money twice. This keeps it safe and honest. People use crypto to buy things or save money online, and it’s all stored on computers instead of in your wallet.",
              ]}
            />

            <ChatPair
              user="back to gym. headline only"
              assistant={["Fitness, Elevated. Anytime You Want."]}
              headline
            />

            <ChatPair
              user="ok now full email again but cleaner than before"
              assistant={[
                "Subject: Fitness, Elevated. Anytime You Want.",
                "Hi [Name],",
                "[Gym Name] is now open—built for busy professionals who value quality and efficiency.",
                "- 24/7 access to premium equipment",
                "- Focused classes designed to maximize your time",
                "- Spacious, upscale environment with no crowds",
                "Stop by for a quick tour or join online anytime.",
                "Ready when you are.",
                "[Link to sign up]",
                "[Your Name]",
                "[Gym Name] Team",
              ]}
            />

            <ChatPair
              user="feel like im selling too hard. fix that"
              assistant={[
                "Subject: Fitness, Elevated. Anytime You Want.",
                "Hi [Name],",
                "[Gym Name] is open—designed to fit your busy schedule with quality and ease.",
                "- 24/7 access to premium equipment",
                "- Efficient classes that respect your time",
                "- Spacious, comfortable environment",
                "Drop by for a tour or join online whenever it suits you.",
                "No pressure — just here when you’re ready.",
                "[Link to sign up]",
                "[Your Name]",
                "[Gym Name] Team",
              ]}
            />

            <ChatPair
              user="final version. 30 sec read max"
              assistant={[
                "Subject: Fitness, Elevated. Anytime You Want.",
                "Hi [Name],",
                "[Gym Name] is open—premium workouts that fit your busy life.",
                "- 24/7 access to quality equipment",
                "- Efficient classes that respect your time",
                "- Spacious, calm environment",
                "Stop by for a tour or join online anytime.",
                "We’re here when you’re ready.",
                "[Link to sign up]",
                "[Your Name]",
                "[Gym Name] Team",
              ]}
            />
          </div>

          <div style={styles.footerCta}>
            <h2 style={styles.footerTitle}>You don’t need to think in prompts.</h2>
            <p style={styles.footerCopy}>
              You do not need to structure it first. You do not need to get it
              perfect. You just need to start.
            </p>
            <Link href="/access" style={styles.primaryBtn}>
              Get access
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ChatPair({ user, assistant, headline = false }) {
  return (
    <>
      <div style={styles.userBubble}>
        <div style={styles.bubbleLabel}>You</div>
        <p style={styles.bubbleText}>{user}</p>
      </div>

      <div style={styles.assistantBubble}>
        <div style={styles.bubbleLabel}>Spot On!</div>
        {assistant.map((item, index) =>
          headline && index === 0 ? (
            <p key={index} style={styles.bubbleHeadline}>
              {item}
            </p>
          ) : (
            <p key={index} style={styles.bubbleText}>
              {item}
            </p>
          )
        )}
      </div>
    </>
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
    padding: "72px 24px 40px",
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
    fontSize: "52px",
    lineHeight: 1.04,
    letterSpacing: "-0.05em",
    maxWidth: "820px",
    margin: "0 0 18px",
  },
  copy: {
    fontSize: "20px",
    lineHeight: 1.6,
    color: "#b6bcc6",
    maxWidth: "760px",
    margin: "0 0 28px",
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
  section: {
    padding: "40px 24px 80px",
  },
  chatBlock: {
    display: "grid",
    gap: "14px",
    maxWidth: "860px",
  },
  userBubble: {
    justifySelf: "start",
    maxWidth: "650px",
    background: "#141518",
    border: "1px solid #26282d",
    borderRadius: "18px",
    padding: "18px 20px",
  },
  assistantBubble: {
    justifySelf: "end",
    maxWidth: "760px",
    background: "#111214",
    border: "1px solid #1e2126",
    borderRadius: "18px",
    padding: "18px 20px",
  },
  bubbleLabel: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#9ca3af",
    marginBottom: "10px",
    fontWeight: 700,
  },
  bubbleText: {
    margin: "0 0 10px",
    lineHeight: 1.7,
    color: "#f3f3f3",
    whiteSpace: "pre-wrap",
  },
  bubbleHeadline: {
    margin: 0,
    lineHeight: 1.4,
    fontSize: "20px",
    fontWeight: 700,
    color: "#f3f3f3",
  },
  footerCta: {
    marginTop: "48px",
    paddingTop: "32px",
    borderTop: "1px solid #1a1a1c",
    maxWidth: "760px",
  },
  footerTitle: {
    fontSize: "32px",
    lineHeight: 1.1,
    letterSpacing: "-0.04em",
    margin: "0 0 12px",
  },
  footerCopy: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#b6bcc6",
    margin: "0 0 24px",
  },
};
