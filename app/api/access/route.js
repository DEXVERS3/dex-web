import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { code } = await req.json();

    if (!process.env.SPOTON_ACCESS_CODE) {
      return Response.json(
        { error: "Server not configured." },
        { status: 500 }
      );
    }

    if (code !== process.env.SPOTON_ACCESS_CODE) {
      return Response.json(
        { error: "Invalid code." },
        { status: 401 }
      );
    }

    const cookieStore = cookies();

    cookieStore.set("spoton_access", "granted", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
