import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminWaitlistPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken || token !== adminToken) {
    redirect("/");
  }

  const rows = await db
    .select()
    .from(waitlistSignups)
    .orderBy(desc(waitlistSignups.createdAt));

  const csvUrl = `/api/admin/waitlist/csv?token=${encodeURIComponent(token!)}`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Waitlist ({rows.length})
          </h1>
          <a
            href={csvUrl}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Export CSV
          </a>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Telegram</th>
                <th className="px-4 py-3 text-left">Source</th>
                <th className="px-4 py-3 text-left">Signed up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, i) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {row.email}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {row.telegramHandle ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.source}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(row.createdAt).toLocaleString("ru-RU", {
                      timeZone: "Asia/Tashkent",
                    })}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    No signups yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
