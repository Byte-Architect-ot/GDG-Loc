import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "this_secret";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    //@ts-ignore
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    // minimal check
    if (!decoded || typeof decoded.email !== "string") {
      return res.status(401).json({
        ok: false,
        message: "Invalid token",
      });
    }

    // attach minimal data
    (req as any).user = { email: decoded.email };

    next();
  } catch {
    return res.status(401).json({
      ok: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
