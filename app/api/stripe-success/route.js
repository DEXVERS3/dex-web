import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    redirect("/access");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      redirect("/access");
    }

    const cookieStore = cookies();

    cookieStore.set("spoton_access", "granted", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    redirect("/studio");
  } catch (error) {
    redirect("/access");
  }
}
