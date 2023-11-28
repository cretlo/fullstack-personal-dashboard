import express from "express";
import db from "../db/db";
import { todos, Todo, NewTodo } from "../db/schema";
import { eq } from "drizzle-orm";
import { authorize } from "../middleware/authorize";
import { validateTodoSchema } from "../middleware/validation";

const router = express.Router();

router.get("/", authorize, async (req, res) => {
    const userId = Number(req.session.userId);
    try {
        const result: Todo[] = await db
            .select()
            .from(todos)
            .where(eq(todos.userId, userId));
        return res.status(200).json(result);
    } catch {
        console.error("Error getting todos");
        return res.send({ message: "Couldn't get todos" });
    }
});

router.post("/", authorize, validateTodoSchema, async (req, res) => {
    const newTodo: NewTodo = req.validatedTodoData;

    try {
        const [result] = await db.insert(todos).values(newTodo).returning();
        return res.status(200).send(result);
    } catch (err) {
        console.error(err);
        return res.status(400).send({ message: "Couldn't insert todo" });
    }
});

router.put("/:id", authorize, validateTodoSchema, async (req, res) => {
    const todoId = Number(req.params.id);
    const updatedTodo: NewTodo = req.validatedTodoData;

    try {
        const [result] = await db
            .update(todos)
            .set(updatedTodo)
            .where(eq(todos.id, todoId))
            .returning();

        return res.status(200).send(result);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Couldn't update todo" });
    }
});

router.delete("/:id", authorize, async (req, res) => {
    const todoId = Number(req.params.id);
    console.log(todoId);

    if (!todoId) {
        return res.status(400).send({ message: "Must supply a todo id" });
    }

    try {
        const [result] = await db
            .delete(todos)
            .where(eq(todos.id, todoId))
            .returning();
        return res.status(200).send(result);
    } catch (err) {
        return res.status(400).send(err);
    }
});

export default router;
