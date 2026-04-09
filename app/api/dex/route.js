import OpenAI from "openai";

let conversation = [];

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
- Apply the instruction directly to the full text unless the user explicitly scopes it narrower
- Do not ask for clarification
- Return only the revised text
`;
}

export async function POST(req) {
  try {
    const { input } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const lastAssistantText = getLastAssistantText(conversation);

    let modelInput;

    if (lastAssistantText && needsDirectRevision(input)) {
      modelInput = [
        {
          role: "system",
          content: `
You are operating inside a conversational interface.

Do not introduce yourself.
Do not state your name.
Do not mention any system, model, assistant, engine, or identity.

Core operating pattern:
Interpret → Act → Adjust

When the user gives a revision instruction about prior output, revise the prior output immediately.
Do not ask for clarification if a reasonable full-text revision is possible.
`,
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
          content: `
You are operating inside a conversational interface.

Do not introduce yourself.
Do not state your name.
Do not mention any system, model, assistant, engine, or identity.

Core operating pattern:
Interpret → Act → Adjust

Default behavior:
- If a reasonable interpretation exists, act on it
- Only ask when multiple outcomes would materially change the result
- No filler
- No hesitation language
- No generic assistant tone
- Continue the thread
- Build on prior exchanges

Output:
- Direct
- Decisive
- Context-aware
- Complete
`,
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
