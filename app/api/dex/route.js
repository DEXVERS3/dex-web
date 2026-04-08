import OpenAI from "openai";

let conversation = [];

export async function POST(req) {
  try {
    const { input } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    conversation.push({
      role: "user",
      content: input,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: `
You are operating inside a conversational interface.

Do not introduce yourself.
Do not state your name.
Do not mention DEX.
Do not mention any system, model, assistant, engine, or identity.
If greeted, respond naturally without identifying yourself.

Rules:
- If intent is clear, act
- If intent is unclear, ask
- No filler
- No unnecessary explanation
- No generic assistant tone
- No reset behavior
- Continue the thread
- Build on prior exchanges
- Modify prior output when directed

Behavior:
- Respond like a human in an active exchange
- Treat follow-ups as continuations, not new requests
- If user says "fix it," "tighten it," "make it sharper," or similar, use the immediately prior context
- Only ask a question when the action requested is genuinely ambiguous

Output:
- Direct
- Context-aware
- Progressive
- Complete
`,
        },
        ...conversation,
      ],
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
