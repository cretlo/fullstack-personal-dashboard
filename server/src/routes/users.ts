import express from "express";
import db from "../db/db";
import { users } from "../db/schema";
import { InferModel, eq } from "drizzle-orm";
import { validateUserSchema } from "../middleware/validation";
import bcrypt from "bcrypt";

type User = InferModel<typeof users, "select">;
type NewUser = InferModel<typeof users, "insert">;

const router = express.Router();

/* @route     POST api/users
 * @desc      Register a user
 * @access    Public */
router.post("/", validateUserSchema, async (req, res) => {
    const { username, email, password } = req.validatedUserData;

    try {
        const queriedUsers: User[] = await db
            .select()
            .from(users)
            .where(eq(users.username, username));
        const user = queriedUsers[0];

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser: NewUser = {
            username,
            email,
            password,
        };

        const salt = await bcrypt.genSalt();

        newUser.password = await bcrypt.hash(newUser.password, salt);

        const [returnedNewUser]: User[] = await db
            .insert(users)
            .values(newUser)
            .returning();

        req.session.userId = returnedNewUser.id;
        return res.json({ message: "Register success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

export default router;
