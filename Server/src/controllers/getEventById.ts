import type { Request, Response } from "express";
import { eventModel } from "../models/eventModel.js";
// GET single event by id



const getEventById = async (req : Request, res: Response) => {
    try {
      const { eventId } = req.params;
  
      const event = await eventModel.findById(eventId);
      if (!event) {
        return res.status(404).json({
          ok: false,
          message: "event not found",
        });
      }
  
      return res.status(200).json({
        ok: true,
        event,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: "internal server error",
      });
    }
  };
  
  export { getEventById };
  