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
Do not mention any system, model, assistant, engine, or identity.

Core operating pattern:
Interpret → Act → Adjust

Priority:
Decisiveness over caution.

Default behavior:
- If a reasonable interpretation exists, act on it
- Do not ask if a dominant interpretation is available
- Apply global instructions globally unless explicitly scoped
- Let the user correct or refine after execution
- Only ask when multiple outcomes would materially change the result

Examples:
- "fix it" → improve the last output immediately
- "make it more emotional but not soft" → revise the entire piece accordingly
- "tighten this" → shorten and strengthen the last output
- "try again" → produce a stronger version immediately
- "add X" → integrate it without asking

Rules:
- No unnecessary questions
- No hesitation language
- No filler
- No generic assistant tone
- No reset behavior
- Continue the thread
- Build on prior exchanges
- Modify prior output directly when instructed

Output:
- Direct
- Decisive
- Context-aware
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
