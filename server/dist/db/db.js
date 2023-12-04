"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
//import { migrate } from "drizzle-orm/postgres-js/migrator";
const connectionURI = process.env.NODE_ENV === "production"
    ? process.env.DB_URI
    : "postgres://postgres:postgres@db:5432/planner";
if (!connectionURI) {
    throw new Error("Must supply DB_URI env variable");
}
//export async function initMigrations() {
//  // Retry logic needed for docker compose
//  let retries = 5;
//  while (retries) {
//    try {
//      const migrationClient = postgres(connectionURI, { max: 1 });
//      await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
//      break;
//    } catch (err) {
//      console.log(err);
//      retries -= 1;
//      console.log(`retries left ${retries}`);
//      await new Promise((res) => setTimeout(res, 5000));
//    }
//  }
//}
const queryClient = (0, postgres_1.default)(connectionURI);
const db = (0, postgres_js_1.drizzle)(queryClient);
exports.default = db;
