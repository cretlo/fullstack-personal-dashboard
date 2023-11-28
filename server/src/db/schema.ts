import {
    pgTable,
    varchar,
    text,
    timestamp,
    boolean,
    serial,
    integer,
    uuid,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 30 }).notNull(),
    email: varchar("email", { length: 50 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
});

//export const contacts = pgTable("contacts", {
//    id: serial("id").primaryKey(),
//    name: varchar("name", { length: 256 }),
//    phone: varchar("phone", { length: 256 }),
//    email: varchar("email", { length: 256 }),
//    userId: integer("user_id")
//        .notNull()
//        .references(() => users.id, {
//            onDelete: "cascade",
//        }),
//});
//
//export type Contact = InferModel<typeof contacts, "select">;
//export type NewContact = InferModel<typeof contacts, "insert">;

export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    color: varchar("color", { length: 7 }).notNull(),
    desc: text("desc"),
    completed: boolean("completed").default(false),
    userId: integer("user_id").references(() => users.id, {
        onDelete: "cascade",
    }),
});

export type Todo = InferModel<typeof todos, "select">;
export type NewTodo = InferModel<typeof todos, "insert">;

export const notes = pgTable("notes", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }).default("Untitled"),
    note: text("note"),
    editorState: text("editor_state"),
    userId: integer("user_id").references(() => users.id, {
        onDelete: "cascade",
    }),
});

export type Note = InferModel<typeof notes, "select">;
export type NewNote = InferModel<typeof notes, "insert">;

export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    start: timestamp("start", { withTimezone: true }).notNull(),
    end: timestamp("end", { withTimezone: true }),
    description: varchar("description", { length: 256 }),
    allDay: boolean("allDay").default(false),
    userId: integer("user_id").references(() => users.id, {
        onDelete: "cascade",
    }),
});

export type Event = InferModel<typeof events, "select">;
export type NewEvent = InferModel<typeof events, "insert">;
