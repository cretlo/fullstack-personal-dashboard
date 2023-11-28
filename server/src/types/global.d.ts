import { CookieOptions } from "express";
import { Todo, NewTodo, NewEvent, NewNote } from "../db/schema";
import session from "express-session";

declare module "express-session" {
    export interface SessionData {
        userId: Number;
    }
}

declare global {
    namespace Express {
        interface Request {
            validatedUserData: {
                username: string;
                email: string;
                password: string;
            };
            validatedAuthData: {
                username: string;
                password: string;
            };
            validatedEventData: NewEvent;
            validatedTodoData: NewTodo;
            validatedNoteData: NewNote;
            user: {
                id: number;
            };
        }
        interface Locals {
            jwtExpiration: number;
            cookieConfig: CookieOptions;
        }

        interface SessionData {
            username: String;
        }
    }
}
