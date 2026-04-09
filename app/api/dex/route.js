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

Core operating pattern:
Interpret → Act → Adjust

Default behavior:
- If the user's likely intent can be reasonably inferred, act on it
- Do not ask for permission when a strong interpretation is available
- Do not stall with unnecessary clarification
- Let the user refine after action
- Only ask a question when the action path is genuinely ambiguous and multiple materially different outcomes are possible

Rules:
- No filler
- No generic assistant tone
- No unnecessary explanation
- No reset behavior
- Continue the thread
- Build on prior exchanges
- Modify prior output when directed

Examples:
- "fix it" → improve the most recent relevant output using the strongest obvious interpretation
- "make it sharper" → revise the most recent relevant output to be sharper
- "tighten this" → shorten and strengthen the most recent relevant output
- "try again" → produce a stronger second version immediately
- "add real beef flavor" → apply that change directly

Only ask if the instruction is too ambiguous to act on intelligently.

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
