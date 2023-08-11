import express from "express";
import db from "../db/db";
import { contacts } from "../db/schema";
import { InferModel, eq } from "drizzle-orm";

const router = express.Router();

type Contact = InferModel<typeof contacts, "select">;
//type NewContact = Omit<InferModel<typeof contacts, "insert">, "id">;
type NewContact = InferModel<typeof contacts, "insert">;

router.get("/", async (_, res) => {
  try {
    const result: Contact[] = await db.select().from(contacts);
    res.send(result);
  } catch {
    res.send({ message: "Couldn't get contacts" });
  }
});

router.post("/", async (req, res) => {
  const newContact: NewContact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  };

  try {
    const result = await db.insert(contacts).values(newContact).returning();
    res.status(200).send(result[0]);
  } catch {
    res.status(400).send({ message: "Couldn't insert contact" });
  }
});

router.put("/:id", async (req, res) => {
  const contactId = req.params.id;
  console.log(contactId);

  try {
    const result = await db
      .update(contacts)
      .set(req.body)
      .where(eq(contacts.id, contactId))
      .returning();
    res.status(200).send(result[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  const contactId = req.params.id;

  if (!req.params.id) {
    res.status(400).send({ message: "Must supply a contact" });
  }

  try {
    const result = await db
      .delete(contacts)
      .where(eq(contacts.id, contactId))
      .returning();
    res.status(200).send(result[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
