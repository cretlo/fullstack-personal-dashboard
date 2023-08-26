import express, { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import db from "../db/db";
import { users } from "../db/schema";
import { InferModel, eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authorize } from "../middleware/authorize";
import { validateAuthSchema } from "../middleware/validation";

const router = express.Router();

/*
 * @route    GET api/auth
 * @desc     Get logged in user
 * @access   Private
 */
router.get("/", authorize, async (req, res) => {
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
 * @desc     (Login) Auth user and get jwt
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
        expiresIn: res.locals.jwtExpiration,
      },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, res.locals.cookieConfig);
        return res.json({ message: "Login success" });
        //return res.json({ token });
      },
    );
  } catch (err) {
    console.error(err);
    res.clearCookie("token", {
      httpOnly: true,
      maxAge: res.locals.cookieExpiration,
    });
    res.status(500).json({ message: "Server error" });
  }
});

// Logout user
router.delete("/", (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    maxAge: res.locals.cookieExpiration,
  });
  return res.json({ message: "User logged out" });
});

export default router;
