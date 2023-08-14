import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const userSchema = z.object({
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
});

/*
 * Users middleware
 */
export function validateUserSchema(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userData = userSchema.parse(req.body);
    req.validatedUserData = userData;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ errors: err.issues });
    } else {
      res.status(500).json({ error: "Something happened" });
    }
  }
}

const contactSchema = z.object({
  userId: z.number(),
  email: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
});

export function validateContactSchema(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const contactData = {
      ...req.body,
      userId: req.user.id,
    };
    req.validatedContactData = contactSchema.parse(contactData);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ errors: err.issues });
    } else {
      res.status(500).json({ error: "Something happened" });
    }
  }
}
