import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import express from "express";
// Routes
import contacts from "./routes/contacts";
import events from "./routes/events";
import notes from "./routes/notes";
//Middleware
import cors from "cors";

async function main() {
  // migrations
  const migrationClient = postgres(
    "postgres://postgres:postgres@localhost:5432/planner",
    { max: 1 },
  );
  //await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/contacts", contacts);
  app.use("/events", events);
  app.use("/notes", notes);

  app.listen(4000, () => {
    console.log("Server listening on port 4000");
  });
}

main().catch((err) => console.error(err));
