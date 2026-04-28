import Stripe from "stripe";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession() {
  return await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/api/stripe-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/access`,
  });
}

export async function GET() {
  try {
    const session = await createCheckoutSession();
    redirect(session.url);
  } catch (error) {
    return Response.json(
      {
        error: "Checkout failed.",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const session = await createCheckoutSession();
    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json(
      {
        error: "Checkout failed.",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
