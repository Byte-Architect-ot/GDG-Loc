import type { Request, Response } from "express";
import { eventModel } from "../models/eventModel.js";

const getEventsByYear = async (req: Request, res: Response) => {
  try {
    const { yearId } = req.params;

    if (!yearId) {
      return res.status(400).json({
        ok: false,
        message: "yearId is required",
      });
    }

    const events = await eventModel
        //@ts-ignore
      .find({ yearGroup: yearId })
      .sort({ eventDate: -1 }); // latest first

    return res.status(200).json({
      ok: true,
      events,
    });
  } catch (err) {
    console.error("getEventsByYear error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};

export { getEventsByYear };
