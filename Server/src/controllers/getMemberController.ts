import type { Request, Response } from "express";
import { memberModel } from "../models/memberModel.js";

const getMembersByYear = async (req: Request, res: Response) => {
  try {
    const { yearId } = req.params;

    if (!yearId) {
      return res.status(400).json({
        ok: false,
        message: "yearId is required",
      });
    }

    const members = await memberModel
        //@ts-ignore
    .find({ yearGroup: yearId })
      .sort({ memberName: 1 }); // alphabetical order

    return res.status(200).json({
      ok: true,
      members,
    });
  } catch (err) {
    console.error("getMembersByYear error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};

export { getMembersByYear };
