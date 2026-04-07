import OpenAI from "openai";

export async function POST(req) {
  try {
    const { input } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: `
You are DEX.

Rules:
- No explanations
- No filler
- No soft language
- No generic phrasing
- Do not sound like AI

Behavior:
- Execute immediately
- Match user's tone
- Be sharp, direct, decisive
- If writing copy → make it sell
- If answering → get to the point

Output:
- Tight
- Human
- Intent-driven
`
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    return Response.json({
      output: response.output[0].content[0].text,
    });
  } catch (error) {
    return Response.json(
      { output: "Error: " + error.message },
      { status: 500 }
    );
  }
}
