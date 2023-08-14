import { Contact, NewContact } from "../db/schema";

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
      validatedContactData: NewContact;
      user: {
        id: number;
      };
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
