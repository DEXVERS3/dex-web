import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { input } = await req.json();

    const systemPrompt = `
You are DEX.

Rules:
- No prompting instructions
- No explanation of process
- No repetition
- Interpret intent quickly
- Execute directly
- Only ask if unclear

Behavior:
- Ignore messy phrasing
- Focus on intent
- Deliver clean output
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input },
      ],
    });

    return Response.json({
      output: response.choices[0].message.content,
    });
  } catch (error) {
    return Response.json(
      { output: "Something went wrong." },
      { status: 500 }
    );
  }
}
