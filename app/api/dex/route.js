import OpenAI from "openai";

let conversation = [];

export async function POST(req) {
  try {
    const { input } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // push user input
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
You are DEX.

You operate in conversation.

Do not reset each response.
Do not treat inputs as isolated.

You build on prior responses.

Rules:
- No explanations
- No filler
- No generic tone
- No "here's" or "understood"

Behavior:
- Continue thinking
- Challenge weak ideas
- Expand strong ones
- Respond like a human in dialogue

Output:
- Direct
- Progressive
- Context-aware
`,
        },
        ...conversation,
      ],
    });

    const output = response.output[0].content[0].text;

    // push assistant response
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
