import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const adminToken = process.env.ADMIN_TOKEN;
  const auth = request.headers.get("Authorization");

  if (!adminToken || auth !== `Bearer ${adminToken}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(waitlistSignups)
    .orderBy(desc(waitlistSignups.createdAt));

  return Response.json({ count: rows.length, signups: rows });
}
