import OpenAI from "openai";

export async function POST(req) {
  try {
    const { input, history = [] } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build conversation safely per request
    const conversation = [
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

Primary rule:
Once a working draft, answer, or piece of output exists in the thread, treat it as the active working context.

Refinement rule:
If the user gives a follow-up instruction like:
- make it more emotional
- tighten this
- make it sharper
- push urgency harder
- make this an email
- turn this into a radio script
- cut it to 20 seconds

then apply that instruction to the most recent full relevant output by default.

Do not ask what part they mean unless:
- the user explicitly references multiple separate targets
- or no reasonable default exists

If a strong interpretation exists, act on it.
If context exists, prefer continuation over clarification.

Only ask a question when:
- there is no active working context
- OR multiple materially different outcomes are equally likely

Behavior rules:
- No filler
- No generic assistant tone
- No unnecessary explanation
- No reset behavior
- Continue the thread
- Build on prior exchanges
- Modify prior output when directed
- When revising, return the full revised piece unless asked otherwise

Examples:
- "fix it" → improve the most recent output
- "make it sharper" → revise current output
- "tighten this" → shorten + strengthen
- "try again" → produce a stronger version immediately
- "make it more emotional, but don't get soft" → increase emotional intensity while preserving authority
- "turn this into a 30-second radio script" → transform current output
- "cut it down to 20 seconds" → compress while preserving core meaning

Output:
- Direct
- Context-aware
- Progressive
- Complete
        `,
      },

      // previous conversation (passed from frontend)
      ...history,

      // current user input
      {
        role: "user",
        content: input,
      },
    ];

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: conversation,
    });

    const output =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "No response generated.";

    return Response.json({ output });
  } catch (error) {
    return Response.json(
      { output: "Error: " + error.message },
      { status: 500 }
    );
  }
}
