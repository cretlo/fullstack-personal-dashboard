import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionURI =
  process.env.CONNECTION_URI_STRING ||
  "postgres://postgres:postgres@localhost:5432/planner";

export async function initMigrations() {
  // Retry logic needed for docker compose
  let retries = 5;
  while (retries) {
    try {
      const migrationClient = postgres(connectionURI, { max: 1 });
      await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}

const queryClient = postgres(connectionURI);

const db: PostgresJsDatabase = drizzle(queryClient);

export default db;
