import Stripe from "stripe";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return Response.json({ error: "Missing session ID." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== "complete") {
      return Response.json({ error: "Checkout not complete." }, { status: 400 });
    }

    const cookieStore = await cookies();

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
      { error: "Confirmation failed.", message: error.message },
      { status: 500 }
    );
  }
}
