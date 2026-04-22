import { db } from "@/db";
import { waitlist } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  let body: { email?: string; telegram?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const telegram = (body.telegram ?? "").trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Valid email required" }, { status: 422 });
  }

  try {
    await db.insert(waitlist).values({ email, telegram });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return Response.json({ error: "Already on the waitlist" }, { status: 409 });
    }
    console.error("waitlist insert error", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
