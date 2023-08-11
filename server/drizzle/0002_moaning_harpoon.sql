ALTER TABLE "notes" RENAME COLUMN "editor" TO "editor_state";--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "start" SET NOT NULL;