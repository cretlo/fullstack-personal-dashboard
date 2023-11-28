import dotenv from "dotenv";
dotenv.config();

import express from "express";
// Routes
import users from "./routes/users";
import auth from "./routes/auth";
import todos from "./routes/todos";
import events from "./routes/events";
import notes from "./routes/notes";
//Middleware
import cors from "cors";

import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

async function main() {
    // Redis client initialization
    const redisClient = createClient({
        url: "redis://redis-store:6379",
    });
    redisClient.connect().catch(console.error);

    const redisStore = new RedisStore({
        client: redisClient,
        prefix: "plannerapp:",
    });

    const app = express();

    app.use(
        session({
            store: redisStore,
            secret: "test",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 600000,
            },
        }),
    );

    app.use(express.json());
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        }),
    );

    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("/api/todos", todos);
    app.use("/api/events", events);
    app.use("/api/notes", notes);

    app.listen(4000, () => {
        console.log("Server listening on port 4000");
    });
}

main().catch((err) => console.error(err));
