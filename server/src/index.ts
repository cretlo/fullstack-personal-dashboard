import express from "express";
const app = express();

// Routes
import contacts from "./routes/contacts";
import events from "./routes/events";
import notes from "./routes/notes";

app.use("/contacts", contacts);
app.use("/events", events);
app.use("/notes", notes);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
