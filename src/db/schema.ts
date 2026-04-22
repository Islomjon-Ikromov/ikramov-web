import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const waitlistSignups = pgTable("waitlist_signups", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  telegramHandle: text("telegram_handle"),
  source: text("source").notNull().default("landing_v1"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  notes: text("notes"),
});
