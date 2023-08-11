import express from "express";
import db from "../db/db";
import { notes } from "../db/schema";
import { InferModel, eq } from "drizzle-orm";

const router = express.Router();

type Note = InferModel<typeof notes, "select">;
type NewNote = InferModel<typeof notes, "insert">;

router.get("/", async (_, res) => {
  try {
    const result: Note[] = await db.select().from(notes);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: err });
  }
});

router.post("/", async (req, res) => {
  console.log("Body: ", req.body);
  const newNote: NewNote = {
    title: req.body.title,
    note: req.body.note,
    editor: req.body.editor,
  };

  try {
    const result = await db.insert(notes).values(newNote).returning();
    res.status(200).send(result[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: err });
  }
});

router.put("/:id", async (req, res) => {
  const noteId = req.params.id;
  const newNote: NewNote = { ...req.body };

  try {
    const result = await db
      .update(notes)
      .set(newNote)
      .where(eq(notes.id, noteId))
      .returning();
    res.status(200).send(result[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  const noteId = req.body.id;

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
