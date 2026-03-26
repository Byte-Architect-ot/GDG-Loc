import type { Request, Response } from "express";
import { adminModel } from "../models/adminModel.js";

export async function adminSignup(req: Request, res: Response) {
  try {
    const { email, password } = req.body ;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "email and password required",
      });
    }

    // Check if admin already exists
    const exists = await adminModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        ok: false,
        message: "admin already exists",
      });
    }

    // Create admin
    const newAdmin = await adminModel.create({
      email,
      password: password, // using same field name as your model
    });

    return res.status(201).json({
      ok: true,
      message: "admin registered successfully",
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
      },
    });
  } catch (err) {
    console.error("adminSignup error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
}
