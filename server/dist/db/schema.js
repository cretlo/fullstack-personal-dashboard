"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.notes = exports.contacts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.contacts = (0, pg_core_1.pgTable)("contacts", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 256 }),
    phone: (0, pg_core_1.varchar)("phone", { length: 256 }),
    email: (0, pg_core_1.varchar)("email", { length: 256 }),
});
exports.notes = (0, pg_core_1.pgTable)("notes", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title", { length: 100 }).default("Untitled"),
    note: (0, pg_core_1.text)("note"),
    editorState: (0, pg_core_1.text)("editor_state"),
});
exports.events = (0, pg_core_1.pgTable)("events", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title", { length: 256 }).notNull(),
    start: (0, pg_core_1.timestamp)("start", { withTimezone: true }).notNull(),
    end: (0, pg_core_1.timestamp)("end", { withTimezone: true }),
    description: (0, pg_core_1.varchar)("description", { length: 256 }).default(""),
    allDay: (0, pg_core_1.boolean)("allDay").default(false),
});
