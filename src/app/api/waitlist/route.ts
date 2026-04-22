import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  let body: { email?: string; telegram?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const telegramHandle = (body.telegram ?? "").trim() || null;
  const source = (body.source ?? "landing_v1").trim() || "landing_v1";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Valid email required" }, { status: 422 });
  }

  const existing = await db
    .select({ id: waitlistSignups.id })
    .from(waitlistSignups)
    .where(eq(waitlistSignups.email, email))
    .limit(1);

  if (existing.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  try {
    await db.insert(waitlistSignups).values({ email, telegramHandle, source });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return Response.json({ ok: true }, { status: 200 });
    }
    console.error("waitlist insert error", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
