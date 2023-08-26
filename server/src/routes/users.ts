import express from "express";
import db from "../db/db";
import { users } from "../db/schema";
import { InferModel, eq } from "drizzle-orm";
import { validateUserSchema } from "../middleware/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const returnedNewUser: User[] = await db
      .insert(users)
      .values(newUser)
      .returning();

    const payload = {
      user: {
        id: returnedNewUser[0].id,
      },
    };

    if (!process.env.JWT_SECRET) {
      throw Error("JWT_SECRET env variable is not defined");
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: res.locals.jwtExpiration,
      },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, res.locals.cookieConfig);
        console.log("Registered ", username);
        return res.json({ message: "Register success" });
        //return res.json({ token });
      },
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
