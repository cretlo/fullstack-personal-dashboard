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

const todoSchema = z.object({
    color: z.string().length(7),
    desc: z.string(),
    completed: z.boolean().optional(),
    userId: z.number(),
});

export function validateTodoSchema(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const todoData = {
            ...req.body,
            userId: req.session.userId,
        };

        req.validatedTodoData = todoSchema.parse(todoData);
        console.log("todo to add: ", req.validatedTodoData);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json({ message: err.flatten() });
        } else {
            console.error(err);
            res.status(500).json({
                message: "Something happened on the server",
            });
        }
    }
}

// TODO: Ensure end gets coerced to null instead of undefined

const eventSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    start: z.coerce.date(),
    //end: z.coerce.date().optional(),
    end: z
        .string()
        .nullable()
        .transform((data) => (!data ? null : new Date(data))),
    description: z.string().optional(),
    allDay: z.boolean(),
});

export function validateEventSchema(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const eventData = {
            ...req.body,
            id: req.params?.id,
        };

        req.validatedEventData = eventSchema.parse(eventData);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            console.error("validateEventSchema zod error");
            res.status(400).json({ message: err.flatten() });
        } else {
            console.error("validateEventSchema server error");
            res.status(500).json({ message: "Something happened" });
        }
    }
}

const deleteEventSchema = z.string();

export function validateDeleteEvent(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        req.params.id = deleteEventSchema.parse(req.params.id);
        console.log(req.params.id);
        console.log(typeof req.params.id);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            console.error("deleteEventSchema zod error");
            res.status(400).json({ error: err.flatten() });
        } else {
            console.error("deleteEventSchema server error");
            res.status(500).json({ error: "Something happened" });
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
            userId: req.session.userId,
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
