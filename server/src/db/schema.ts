import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  email: varchar("email", { length: 256 }),
});

export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).default("Untitled"),
  note: text("note"),
  editor: text("editor"),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }),
  start: timestamp("start", { withTimezone: true }),
  end: timestamp("end", { withTimezone: true }),
  description: varchar("description", { length: 256 }).default(""),
  allDay: boolean("allDay").default(false),
});
