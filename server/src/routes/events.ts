import express from "express";
import db from "../db/db";
import { events } from "../db/schema";
import { InferModel, eq, and } from "drizzle-orm";
import { authorize } from "../middleware/authorize";
import {
    validateDeleteEvent,
    validateEventSchema,
} from "../middleware/validation";

const router = express.Router();

type Event = InferModel<typeof events, "select">;
type NewEvent = InferModel<typeof events, "insert">;

router.get("/", authorize, async (req, res) => {
    const userId = Number(req.session.userId);

    try {
        const result: Event[] = await db
            .select()
            .from(events)
            .where(eq(events.userId, userId));
        return res.status(200).send(result);
    } catch (err) {
        return res.send({ message: "Couldn't get events" });
    }
});

router.post("/", authorize, validateEventSchema, async (req, res) => {
    const newEvent: NewEvent = req.validatedEventData;

    try {
        const [result] = await db.insert(events).values(newEvent).returning();
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err });
    }
});

router.put("/:id", authorize, validateEventSchema, async (req, res) => {
    const eventId = req.params.id;
    const updatedEvent: NewEvent = req.validatedEventData;

    try {
        const [result] = await db
            .update(events)
            .set(updatedEvent)
            .where(eq(events.id, eventId))
            .returning();
        return res.status(200).send(result);
    } catch (err) {
        return res.status(400).send({ message: err });
    }
});

router.delete("/:id", authorize, validateDeleteEvent, async (req, res) => {
    const eventId = req.params.id;
    const userId = Number(req.session.userId);

    try {
        await db
            .delete(events)
            .where(and(eq(events.id, eventId), eq(events.userId, userId)))
            .returning();

        return res.status(200).json({ message: "Event successfully deleted" });
    } catch (err) {
        return res.status(400).send({ error: "Server error deleting event" });
    }
});

export default router;
