import type { Request, Response } from "express";
import { memberModel } from "../models/memberModel.js";

const getMemberById = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      return res.status(400).json({
        ok: false,
        message: "memberId is required",
      });
    }

    const member = await memberModel.findById(memberId);

    if (!member) {
      return res.status(404).json({
        ok: false,
        message: "member not found",
      });
    }

    return res.status(200).json({
      ok: true,
      member,
    });
  } catch (err) {
    console.error("getMemberById error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};

export { getMemberById };
