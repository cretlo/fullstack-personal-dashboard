import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
//import { migrate } from "drizzle-orm/postgres-js/migrator";

const connectionURI =
    process.env.NODE_ENV === "production"
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

const queryClient = postgres(connectionURI);

const db: PostgresJsDatabase = drizzle(queryClient);

export default db;
