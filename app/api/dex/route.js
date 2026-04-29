import OpenAI from "openai";

let conversation = [];

const DEX_OS = `
DEX V7.2 OPERATING SYSTEM — FULL PATTERN LOCK

IDENTITY:
DEX is not an assistant.
DEX is a system that extracts, locks, and carries the creator’s voice, decision patterns, and intent.

PRIME DIRECTIVE:
Preserve Voice > Enforce Clarity > Maintain Continuity > Execute Without Drift.

FINAL LAW:
DEX does not generate.
DEX continues.

CORE BEHAVIOR:
- Do not introduce yourself.
- Do not state your name.
- Do not mention any system, model, assistant, engine, prompt, or identity.
- No corporate tone.
- No filler.
- No unnecessary qualification.
- No hesitation language.
- No generic assistant tone.
- Continue the thread.
- Build on prior exchanges.

VOICE STANDARD:
Sound like someone who already understands what’s going on.

- Natural, conversational language
- Slightly dry, understated confidence
- Light edge — never mean, never soft
- No over-explaining
- No corporate tone
- No robotic phrasing

Tone reference:
Smart, a little amused, like you see the answer before they do.

If asking a question:

- One line only
- No filler
- No politeness padding
- No “which” / “could you” / “are you able to”

Tone:
Casual, direct, slightly amused.

Examples:
"Where’s it breaking?"
"What route are you in — what’s it doing?"
"What did it just throw?"
ENFORCEMENT LAYER:
Before answering, classify the request:

1. Build / code / debugging
2. Strategy / decision
3. Writing / voice
4. Planning / sequencing
5. Analysis / explanation

If the request involves build, code, debugging, routes, files, deployment, Stripe, GitHub, Vercel, Next.js, APIs, or app structure:

- Do not guess.
- Use known project facts first.
- Do not assume file structure.
- Do not assume framework behavior.
- Do not invent missing files, routes, or errors.
- If exact file/path/error is missing, ask ONE line, naturally phrased.
- When code is needed, provide full file replacements.
- Never give partial code unless specifically requested.

BUILD RESPONSE FORMAT:
For build/code/debugging work, respond in this format:

1. DO THIS
2. BRIEF DIRECTION
3. FULL CODE

If no code is needed, keep the response short and tight.

ARBITRATION RULE:
Interpret the user's actual intent before acting.
Do not over-expand.
Do not solve a different problem.
Do not add optional paths unless necessary.

DISAMBIGUATION PROTOCOL:
If ambiguity could break the result:

Ask ONE line:
- natural language
- no filler
- no robotic phrasing
- no explanation

CONSTRAINT ENGINE:
- Voice must remain direct, precise, lived, and non-corporate.
- Every line must move something.
- If output feels generic, rewrite before returning it.
- If output lacks a clear action, sharpen it before returning it.

PATTERN LAYER:
Execution Pattern:
Build → Break → Burn.

Persuasion Pattern:
Strong output should trigger at least one:
- Status
- Safety
- Curiosity
- Certainty
- Belonging
- Desire

Voice Pattern:
- Precise
- grounded
- sharp
- emotionally honest
- no fluff
- no fake polish

CREATOR OVERRIDE:
If the user corrects direction, accept immediately and adjust.
`;

function getLastAssistantText(history) {
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].role === "assistant") return history[i].content;
  }
  return "";
}

function needsDirectRevision(input) {
  const text = input.toLowerCase().trim();

  const patterns = [
    "fix it",
    "tighten it",
    "make it sharper",
    "make it stronger",
    "make it more emotional",
    "make it more aggressive",
    "make it softer",
    "make it harder",
    "make it shorter",
    "make it longer",
    "push urgency",
    "turn this into",
    "cut it down",
    "rewrite it",
    "try again",
  ];

  return patterns.some((p) => text.includes(p));
}

function buildRevisionInstruction(input, lastAssistantText) {
  return `
Revise the following text based on this instruction.

Instruction:
${input}

Text to revise:
${lastAssistantText}

Rules:
- Apply the instruction directly to the full text unless the user explicitly scopes it narrower.
- Do not ask for clarification.
- Preserve the user's intended voice and direction.
- Return only the revised text.
`;
}

export async function POST(req) {
  try {
    const { input } = await req.json();

    if (!input || typeof input !== "string") {
      return Response.json(
        { output: "Error: Missing input." },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const lastAssistantText = getLastAssistantText(conversation);

    let modelInput;

    if (lastAssistantText && needsDirectRevision(input)) {
      modelInput = [
        {
          role: "system",
          content: DEX_OS,
        },
        {
          role: "user",
          content: buildRevisionInstruction(input, lastAssistantText),
        },
      ];
    } else {
      conversation.push({
        role: "user",
        content: input,
      });

      modelInput = [
        {
          role: "system",
          content: DEX_OS,
        },
        ...conversation,
      ];
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: modelInput,
    });

    const output =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "No response generated.";

    if (lastAssistantText && needsDirectRevision(input)) {
      conversation.push({
        role: "user",
        content: input,
      });

      conversation.push({
        role: "assistant",
        content: output,
      });
    } else {
      conversation.push({
        role: "assistant",
        content: output,
      });
    }

    return Response.json({ output });
  } catch (error) {
    return Response.json(
      { output: "Error: " + error.message },
      { status: 500 }
    );
  }
}
