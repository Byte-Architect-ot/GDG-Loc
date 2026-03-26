import type { Request, Response } from "express";
import { yearGroupModel } from "../models/yearGroupModel.js";

const getAllYears = async (req: Request, res: Response) => {
  try {
    const years = await yearGroupModel
      .find()
      .sort({ year: 1 }); 

      console.log("Fetched years:", years);
    return res.status(200).json({
      ok: true,
      years,
    });
  } catch (err) {
    console.error("getAllYears error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};

export { getAllYears };
