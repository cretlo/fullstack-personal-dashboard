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
      console.log("Validation failed");
      res.status(400).json({ message: err.issues[0].message });
    } else {
      res.status(500).json({ message: "Something happened" });
    }
  }
}

const contactSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  userId: z.number(),
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
      res.status(400).json({ message: err.issues[0].message });
    } else {
      res.status(500).json({ message: "Something happened" });
    }
  }
}

const eventSchema = z.object({
  title: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date().optional(),
  description: z.string().optional(),
  allDay: z.boolean(),
  userId: z.number(),
});

export function validateEventSchema(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log(req.body, "\n\n");
    const eventData = {
      ...req.body,
      userId: req.user.id,
    };
    req.validatedEventData = eventSchema.parse(eventData);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.issues[0].message });
    } else {
      res.status(500).json({ message: "Something happened" });
    }
  }
}

const noteSchema = z.object({
  title: z.string().optional(),
  note: z.string().optional(),
  editorState: z.string().optional(),
  userId: z.number(),
});

export function validateNoteSchema(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const noteData = {
      ...req.body,
      userId: req.user.id,
    };
    req.validatedNoteData = noteSchema.parse(noteData);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.issues[0].message });
    } else {
      res.status(500).json({ message: "Something happened" });
    }
  }
}

/*
 * Login middleware
 */
const authSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(6),
});

export function validateAuthSchema(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authData = authSchema.parse(req.body);
    req.validatedAuthData = authData;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.issues[0].message });
    } else {
      res.status(500).json({ message: "Something happended" });
    }
  }
}
