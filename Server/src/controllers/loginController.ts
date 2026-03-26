import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { adminModel } from "../models/adminModel.js";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET ?? "this_secret";

export async function adminLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "email and password required",
      });
    }

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ ok: false, message: "invalid credentials" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ ok: false, message: "invalid credentials" });
    }

    const payload = { email: admin.email };

    const token = jwt.sign(payload, JWT_SECRET);

    return res.status(200).json({ ok: true, token });

  } catch (err) {
    console.error("adminLogin error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
}