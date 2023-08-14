import express from "express";
import db from "../db/db";
import { events } from "../db/schema";
import { InferModel, eq } from "drizzle-orm";

const router = express.Router();

type Event = InferModel<typeof events, "select">;
type NewEvent = InferModel<typeof events, "insert">;

router.get("/", async (_, res) => {
  try {
    const result: Event[] = await db.select().from(events);
    res.status(200).send(result);
  } catch (err) {
    res.send({ message: "Couldn't get events" });
  }
});

router.post("/", async (req, res) => {
  const newEvent: NewEvent = {
    title: req.body.title,
    start: new Date(req.body.start),
    end: req.body.end ? new Date(req.body.end) : null,
    description: req.body.description,
    allDay: req.body.allDay,
  };

  try {
    const result = await db.insert(events).values(newEvent).returning();
    res.status(200).send(result[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
});

router.put("/:id", async (req, res) => {
  const eventId = Number(req.params.id);

  const updatedEvent: NewEvent = { ...req.body };

  try {
    const result = await db
      .update(events)
      .set(updatedEvent)
      .where(eq(events.id, eventId))
      .returning();
    res.status(200).send(result[0]);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  const eventId = Number(req.params.id);

  try {
    const result = await db
      .delete(events)
      .where(eq(events.id, eventId))
      .returning();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

export default router;
