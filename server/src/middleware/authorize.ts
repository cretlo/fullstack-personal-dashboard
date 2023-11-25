import { Request, Response, NextFunction } from "express";

export function authorize(req: Request, res: Response, next: NextFunction) {
    const session = req.session;

    if (!session || !session.userId) {
        return res.status(401).json({ message: "No session established" });
    }

    try {
        next();
    } catch (err) {
        if (err instanceof ReferenceError) {
            console.error(err.message);
            res.status(500).json({ message: "Server error" });
        } else {
            console.error("Something happened in authorize middleware");
            res.status(401).json({ message: "Authorization denied" });
        }
    }
}
