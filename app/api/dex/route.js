import OpenAI from "openai";
import { saveMessage, getConversation } from "../../../lib/db";

export async function POST(req) {
  try {
    const { input, sessionId = "default" } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const history = getConversation(sessionId);

    const messages = [
      {
        role: "system",
        content: `
Do not introduce yourself.
Do not mention any system or identity.

If intent is clear, act.
If unclear, ask.

No filler. No explanation unless needed.
Continue the thread.
`,
      },
      ...history,
      { role: "user", content: input },
    ];

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: messages,
    });

    const output =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "";

    saveMessage(sessionId, { role: "user", content: input });
    saveMessage(sessionId, { role: "assistant", content: output });

    return Response.json({ output });
  } catch (error) {
    return Response.json(
      { output: "Error: " + error.message },
      { status: 500 }
    );
  }
}
