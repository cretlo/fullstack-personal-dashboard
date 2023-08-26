import dotenv from "dotenv";
dotenv.config();

import { initMigrations } from "./db/db";

import express from "express";
// Routes
import users from "./routes/users";
import auth from "./routes/auth";
import contacts from "./routes/contacts";
import events from "./routes/events";
import notes from "./routes/notes";
//Middleware
import cors from "cors";
import cookieParser from "cookie-parser";

async function main() {
  // Drizzle migrations
  await initMigrations();

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use((_, res, next) => {
    res.locals.jwtExpiration = 3600;
    res.locals.cookieConfig = {
      httpOnly: true,
    };
    next();
  });

  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/contacts", contacts);
  app.use("/api/events", events);
  app.use("/api/notes", notes);

  app.listen(4000, () => {
    console.log("Server listening on port 4000");
  });
}

main().catch((err) => console.error(err));
