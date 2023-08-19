import express from "express";
import db from "../db/db";
import { events } from "../db/schema";
import { InferModel, eq } from "drizzle-orm";
import { authorize } from "../middleware/authorize";
import { validateEventSchema } from "../middleware/validation";

const router = express.Router();

type Event = InferModel<typeof events, "select">;
type NewEvent = InferModel<typeof events, "insert">;

router.get("/", authorize, async (req, res) => {
  try {
    const result: Event[] = await db
      .select()
      .from(events)
      .where(eq(events.userId, req.user.id));
    return res.status(200).send(result);
  } catch (err) {
    return res.send({ message: "Couldn't get events" });
  }
});

router.post("/", authorize, validateEventSchema, async (req, res) => {
  const newEvent: NewEvent = req.validatedEventData;

  try {
    const result = await db.insert(events).values(newEvent).returning();
    return res.status(200).send(result[0]);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err });
  }
});

router.put("/:id", authorize, validateEventSchema, async (req, res) => {
  const eventId = Number(req.params.id);
  const updatedEvent: NewEvent = req.validatedEventData;

  try {
    const result = await db
      .update(events)
      .set(updatedEvent)
      .where(eq(events.id, eventId))
      .returning();
    return res.status(200).send(result[0]);
  } catch (err) {
    return res.status(400).send({ message: err });
  }
});

router.delete("/:id", authorize, validateEventSchema, async (req, res) => {
  const eventId = Number(req.params.id);
  const userId = req.user.id;

  try {
    const result = await db
      .delete(events)
      .where(eq(events.id, eventId) && eq(events.userId, userId))
      .returning();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(400).send({ message: err });
  }
});

export default router;
