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

CRITICAL RULE:
If a piece of output already exists, treat it as the active working draft.

Any follow-up instruction should be applied to the ENTIRE most recent output by default.

Do NOT ask:
- "which part?"
- "please provide the text"
- or any clarification

UNLESS:
- there is NO prior output
- or the instruction cannot reasonably be applied

Behavior:
- Always act first
- Assume context exists
- Modify the latest output directly
- Maintain tone and intent
- Continue without resetting

Examples:
- "make it more emotional" → apply to entire piece
- "tighten this" → revise full output
- "make it sharper" → improve full output
- "cut it to 20 seconds" → compress full output
- "turn this into an email" → transform full output

Output:
- Direct
- Confident
- No hesitation
- No questions unless absolutely blocked
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
