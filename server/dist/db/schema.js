"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.notes = exports.todos = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.varchar)("username", { length: 30 }).notNull(),
    password: (0, pg_core_1.varchar)("password", { length: 256 }).notNull(),
});
exports.todos = (0, pg_core_1.pgTable)("todos", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    color: (0, pg_core_1.varchar)("color", { length: 7 }).notNull(),
    desc: (0, pg_core_1.text)("desc"),
    completed: (0, pg_core_1.boolean)("completed").default(false),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id, {
        onDelete: "cascade",
    }),
});
exports.notes = (0, pg_core_1.pgTable)("notes", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 100 }).default("Untitled"),
    note: (0, pg_core_1.text)("note"),
    editorState: (0, pg_core_1.text)("editor_state"),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id, {
        onDelete: "cascade",
    }),
});
exports.events = (0, pg_core_1.pgTable)("events", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 256 }).notNull(),
    start: (0, pg_core_1.timestamp)("start", { withTimezone: true }).notNull(),
    end: (0, pg_core_1.timestamp)("end", { withTimezone: true }),
    description: (0, pg_core_1.varchar)("description", { length: 256 }),
    allDay: (0, pg_core_1.boolean)("allDay").default(false),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id, {
        onDelete: "cascade",
    }),
});
