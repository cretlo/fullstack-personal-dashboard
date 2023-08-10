CREATE TABLE IF NOT EXISTS "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"phone" varchar(256),
	"email" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"start" timestamp with time zone,
	"end" timestamp with time zone,
	"description" varchar(256) DEFAULT '',
	"allDay" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(100) DEFAULT 'Untitled',
	"note" text,
	"editor" text
);
