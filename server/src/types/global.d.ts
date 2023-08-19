import { CookieOptions } from "express";
import { Contact, NewContact, NewEvent, NewNote } from "../db/schema";

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
      validatedContactData: NewContact;
      validatedNoteData: NewNote;
      user: {
        id: number;
      };
    }
    interface Locals {
      jwtExpiration: number;
      cookieConfig: CookieOptions;
    }
  }
}

//declare namespace Express {
//  export interface Request {
//    validatedUserData: {
//      username: string;
//      email: string;
//      password: string;
//    };
//    validatedAuthData: {
//      username: string;
//      password: string;
//    };
//    validatedContactData
//    user: {
//      id: number;
//    };
//  }
//}
