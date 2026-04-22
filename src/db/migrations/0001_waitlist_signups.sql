CREATE TABLE "waitlist_signups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"telegram_handle" text,
	"source" text DEFAULT 'landing_v1' NOT NULL,
	"created_at" timestamptz DEFAULT now() NOT NULL,
	"notes" text,
	CONSTRAINT "waitlist_signups_email_unique" UNIQUE("email")
);
--> statement-breakpoint
INSERT INTO "waitlist_signups" ("email", "telegram_handle", "created_at")
SELECT "email", "telegram", "created_at" FROM "waitlist"
ON CONFLICT ("email") DO NOTHING;
--> statement-breakpoint
DROP TABLE "waitlist";
