import express from "express";
import { z, ZodError } from "zod";
import db from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { authorize } from "../middleware/authorize";
import { validateAuthSchema } from "../middleware/validation";

const router = express.Router();

/*
 * @route    GET api/auth
 * @desc     Get logged in user
 * @access   Private
 */
router.get("/", authorize, async (req, res) => {
    const userId = Number(req.session.userId);

    try {
        const [user] = await db
            .select({ id: users.id, username: users.username })
            .from(users)
            .where(eq(users.id, userId));

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/*
 * @route    POST api/auth
 * @desc     (Login) Auth user and get jwt
 * @access   Public
 */
router.post("/", validateAuthSchema, async (req, res) => {
    const { username, password } = req.validatedAuthData;

    try {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, username));

        if (!user) {
            return res.status(400).send({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        req.session.userId = user.id;
        return res.json({ message: "Login success " });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Logout user
router.delete("/", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
    });
    return res.json({ message: "User logged out" });
});

export default router;
