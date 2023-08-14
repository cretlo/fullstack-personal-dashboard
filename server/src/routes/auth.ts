import express, { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import db from "../db/db";
import { users } from "../db/schema";
import { InferModel, eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/auth";

const router = express.Router();

const authSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(6),
});

function validateAuthSchema(req: Request, res: Response, next: NextFunction) {
  try {
    const authData = authSchema.parse(req.body);
    req.validatedAuthData = authData;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.issues });
    } else {
      res.status(500).json({ error: "Something happended" });
    }
  }
}

/*
 * @route    GET api/auth
 * @desc     Get logged in user
 * @access   Private
 */
router.get("/", authenticate, async (req, res) => {
  const userId = Number(req.user.id);
  try {
    const queriedUsers = await db
      .select({ id: users.id, username: users.username })
      .from(users)
      .where(eq(users.id, userId));
    const user = queriedUsers[0];

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/*
 * @route    POST api/auth
 * @desc     Auth user and get jwt
 * @access   Public
 */
router.post("/", validateAuthSchema, async (req, res) => {
  const { username, password } = req.validatedAuthData;

  try {
    const queriedUsers = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    const user = queriedUsers[0];

    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    if (!process.env.JWT_SECRET) {
      throw Error("JWT_SECRET env variable is not defined");
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
