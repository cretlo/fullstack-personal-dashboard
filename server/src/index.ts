import dotenv from "dotenv";
dotenv.config();

import express from "express";
// Routes
import users from "./routes/users";
import auth from "./routes/auth";
import contacts from "./routes/contacts";
import events from "./routes/events";
import notes from "./routes/notes";
//Middleware
import cors from "cors";
// import cookieParser from "cookie-parser";

import session from "express-session";

async function main() {
    const app = express();

    app.use(
        session({
            secret: "test",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 10000,
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
    app.use("/api/contacts", contacts);
    app.use("/api/events", events);
    app.use("/api/notes", notes);

    app.listen(4000, () => {
        console.log("Server listening on port 4000");
    });
}

main().catch((err) => console.error(err));
