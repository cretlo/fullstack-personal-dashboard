import express from "express";
import db from "../db/db";
import { notes } from "../db/schema";
import { InferModel, eq } from "drizzle-orm";
import { authorize } from "../middleware/authorize";
import { validateNoteSchema } from "../middleware/validation";

const router = express.Router();

type Note = InferModel<typeof notes, "select">;
type NewNote = InferModel<typeof notes, "insert">;

router.get("/", authorize, async (req, res) => {
    try {
        const result: Note[] = await db
            .select()
            .from(notes)
            .where(eq(notes.userId, Number(req.session.userId)));
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
});

router.post("/", authorize, validateNoteSchema, async (req, res) => {
    const newNote: NewNote = req.validatedNoteData;

    try {
        const result = await db.insert(notes).values(newNote).returning();
        res.status(200).send(result[0]);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
});

router.put("/:id", authorize, validateNoteSchema, async (req, res) => {
    const noteId = Number(req.params.id);
    const updatedNote: NewNote = req.validatedNoteData;

    try {
        const result = await db
            .update(notes)
            .set(updatedNote)
            .where(eq(notes.id, noteId))
            .returning();
        res.status(200).send(result[0]);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
});

router.delete("/:id", authorize, async (req, res) => {
    const noteId = Number(req.params.id);

    try {
        const result = await db
            .delete(notes)
            .where(eq(notes.id, noteId))
            .returning();
        res.status(200).send(result[0]);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
});

export default router;
