import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

function escapeCsv(value: string | null | undefined): string {
  const s = value ?? "";
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken || token !== adminToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const rows = await db
    .select()
    .from(waitlistSignups)
    .orderBy(desc(waitlistSignups.createdAt));

  const header = ["id", "email", "telegram_handle", "source", "created_at", "notes"].join(",");
  const lines = rows.map((r) =>
    [
      escapeCsv(r.id),
      escapeCsv(r.email),
      escapeCsv(r.telegramHandle),
      escapeCsv(r.source),
      escapeCsv(new Date(r.createdAt).toISOString()),
      escapeCsv(r.notes),
    ].join(",")
  );

  const csv = [header, ...lines].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="waitlist.csv"',
    },
  });
}
