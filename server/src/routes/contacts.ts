import express from "express";
import db from "../db/db";
import { contacts, Contact, NewContact } from "../db/schema";
import { eq } from "drizzle-orm";
import { authorize } from "../middleware/authorize";
import { validateContactSchema } from "../middleware/validation";

const router = express.Router();

router.get("/", authorize, async (req, res) => {
    try {
        const result: Contact[] = await db
            .select()
            .from(contacts)
            .where(eq(contacts.userId, Number(req.session.userId)));
        return res.status(200).json(result);
    } catch {
        return res.send({ message: "Couldn't get contacts" });
    }
});

router.post("/", authorize, validateContactSchema, async (req, res) => {
    const newContact: NewContact = req.validatedContactData;

    try {
        const [result] = await db
            .insert(contacts)
            .values(newContact)
            .returning();
        return res.status(200).send(result);
    } catch (err) {
        console.error(err);
        return res.status(400).send({ message: "Couldn't insert contact" });
    }
});

router.put("/:id", authorize, validateContactSchema, async (req, res) => {
    const contactId = Number(req.params.id);
    const updatedContact: NewContact = req.validatedContactData;

    try {
        const [result] = await db
            .update(contacts)
            .set(updatedContact)
            .where(eq(contacts.id, contactId))
            .returning();

        return res.status(200).send(result);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Couldn't update contact" });
    }
});

router.delete("/:id", authorize, async (req, res) => {
    const contactId = Number(req.params.id);

    if (!contactId) {
        return res.status(400).send({ message: "Must supply a contact" });
    }

    try {
        const [result] = await db
            .delete(contacts)
            .where(eq(contacts.id, contactId))
            .returning();
        return res.status(200).send(result);
    } catch (err) {
        return res.status(400).send(err);
    }
});

export default router;
