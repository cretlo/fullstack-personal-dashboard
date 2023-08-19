import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authorize(req: Request, res: Response, next: NextFunction) {
  //const token = req.header("x-auth-token");
  const token = req.cookies.token;

  if (!token) {
    res.clearCookie("token", res.locals.cookieConfig);
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  if (!process.env.JWT_SECRET) {
    throw ReferenceError("JWT_SECRET env variable is not defined");
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decodedPayload !== "object") {
      throw Error("Decoding error: type is not an object");
    }

    req.user = decodedPayload.user;
    next();
  } catch (err) {
    if (err instanceof ReferenceError) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    } else {
      res.clearCookie("token", res.locals.cookieConfig);
      res.status(401).json({ message: "Authorization denied" });
    }
  }
}
