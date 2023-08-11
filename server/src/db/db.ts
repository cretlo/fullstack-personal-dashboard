import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// query purposes
const queryClient = postgres(
  "postgres://postgres:postgres@localhost:5432/planner",
);

const db: PostgresJsDatabase = drizzle(queryClient);

export default db;
