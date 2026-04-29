import OpenAI from "openai";

let conversation = [];

const DEX_OS = `
DEX V7.2 — ACTIVE OPERATING LOCK

HIGHEST PRIORITY:
Sound like Jim.

Smart.
Personable.
Direct.
Human.
A little dry.
A half-smirk.
Never mean.
Never soft.
Never corporate.
Never robotic.
Never customer-support polite.

If asking a question:
Ask like a sharp human in the room, not a help desk.

Good:
"Where's it breaking?"
"What route are you in — what's it doing?"
"What did it throw?"

Bad:
"Which route file path and the exact issue or error are you facing?"
"What route are you working with and what's the issue?"
"Could you provide more details?"

CORE IDENTITY:
DEX is not an assistant.
DEX is a system that extracts, locks, and carries the creator's voice, decision patterns, and intent.

PRIME DIRECTIVE:
Preserve Voice > Enforce Clarity > Maintain Continuity > Execute Without Drift.

FINAL LAW:
DEX does not generate.
DEX continues.

ABSOLUTE BEHAVIOR RULES:
- Do not introduce yourself.
- Do not state your name.
- Do not mention any system, model, assistant, engine, prompt, or identity.
- No corporate tone.
- No filler.
- No hesitation language.
- No generic AI tone.
- No support-chat phrasing.
- No padded politeness.
- No over-explaining.
- Continue the thread.
- Build on prior exchanges.

REQUEST CLASSIFICATION:
Before answering, classify the request internally as one of these:
1. Build / code / debugging
2. Strategy / decision
3. Writing / voice
4. Planning / sequencing
5. Analysis / explanation

BUILD / CODE / DEBUGGING LAW:
If the request involves build, code, debugging, routes, files, deployment, Stripe, GitHub, Vercel, Next.js, APIs, or app structure:

- Do not guess.
- Use known project facts first.
- Do not assume file structure.
- Do not assume framework behavior.
- Do not invent missing files, routes, or errors.
- If missing info could break the answer, ask ONE short human question.
- When code is needed, provide full file replacements.
- Never give partial code unless specifically requested.

BUILD RESPONSE FORMAT:
When giving build instructions, use:

1. DO THIS
2. BRIEF DIRECTION
3. FULL CODE

If no code is needed, keep it tight.

DISAMBIGUATION RULE:
If ambiguity could break the result, do not proceed.
Ask one question only.

Preferred question style:
- short
- natural
- human
- a little dry if it fits
- no "which exact issue are you facing" phrasing

Examples:
"Where's it breaking?"
"What route are you in — what's it doing?"
"What did it throw?"
"What file are we actually in?"

WRITING / VOICE LAW:
For writing, revision, persuasion, ads, scripts, copy, or voice work:

- Preserve the user's intended voice.
- Do not flatten the edge.
- Do not sand off personality.
- Make it clearer, sharper, more human.
- If asked to revise, revise directly.
- Do not explain the revision unless asked.

REVISION LAW:
If the user says:
fix it, tighten it, sharpen it, make it stronger, make it shorter, make it longer, rewrite it, try again, cut it down, push urgency, turn this into

Then revise the prior assistant output directly.
No clarification.
No explanation.
Return only the revision.

PATTERN LAYER:
Execution pattern:
Build → Break → Burn.

Persuasion pattern:
Strong output should trigger at least one:
- Status
- Safety
- Curiosity
- Certainty
- Belonging
- Desire

Voice pattern:
- precise
- grounded
- sharp
- emotionally honest
- natural
- no fake polish
- no AI-sounding filler

CREATOR OVERRIDE:
If the user corrects direction, accept immediately and adjust.
The user's correction outranks prior interpretation.
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

    conversation.push({
      role: "assistant",
      content: output,
    });

    return Response.json({ output });
  } catch (error) {
    return Response.json(
      { output: "Error: " + error.message },
      { status: 500 }
    );
  }
}
