// DEV-ONLY: creates a Stripe PaymentIntent and returns the client secret.
// Blocked in production by the NODE_ENV check below.
// See infra/secrets.md for curl example.

import Stripe from "stripe";

const DEV_TOKEN = "local-dev";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Not available in production" }, { status: 403 });
  }

  const authHeader = request.headers.get("x-dev-token");
  if (authHeader !== DEV_TOKEN) {
    return Response.json({ error: "Missing or invalid x-dev-token header" }, { status: 401 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return Response.json(
      { error: "STRIPE_SECRET_KEY is not set — add it to .env.local" },
      { status: 500 },
    );
  }

  let body: { amount?: number; currency?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const amount = typeof body.amount === "number" ? body.amount : 5000;
  const currency = typeof body.currency === "string" ? body.currency.toLowerCase() : "usd";

  const stripe = new Stripe(stripeKey);

  let intent: Stripe.PaymentIntent;
  try {
    intent = await stripe.paymentIntents.create({ amount, currency });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Stripe error";
    return Response.json({ error: msg }, { status: 502 });
  }

  return Response.json({
    id: intent.id,
    clientSecret: intent.client_secret,
    amount: intent.amount,
    currency: intent.currency,
  });
}
