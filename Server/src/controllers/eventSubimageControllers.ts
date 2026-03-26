import type { Request, Response } from "express";
import { eventModel } from "../models/eventModel.js";
import uploadimage from "./uploadtoS3.js";




const addSubImages = async (req: Request, res: Response) => {
    try {
      const { eventId } = req.params;
  
      if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
        return res.status(400).json({
          ok: false,
          message: "at least one image is required",
        });
      }
  
      const event = await eventModel.findById(eventId);
      if (!event) {
        return res.status(404).json({
          ok: false,
          message: "event not found",
        });
      }
  
      const uploadPromises = req.files.map((file: Express.Multer.File) =>
        uploadimage(file.originalname, file.buffer)
      );
  
      const s3Keys = await Promise.all(uploadPromises);
  
      event.eventsubImagesKey.push(...s3Keys);
      await event.save();
  
      return res.status(201).json({
        ok: true,
        message: "sub images added successfully",
        subImageKeys: s3Keys,
      });
    } catch (err) {
      console.error("addSubImages error:", err);
      return res.status(500).json({
        ok: false,
        message: "internal server error",
      });
    }
  };
  



const deleteSubImage = async (req: Request, res: Response) => {
    try {
      const { eventId, imageKey } = req.params;
  
      const event = await eventModel.findById(eventId);
      if (!event) {
        return res.status(404).json({
          ok: false,
          message: "event not found",
        });
      }
  
      event.eventsubImagesKey = event.eventsubImagesKey.filter(
        (key) => key !== imageKey
      );
  
      await event.save();

      return res.status(200).json({
        ok: true,
        message: "sub image deleted successfully",
      });
    } catch (err) {
      console.error("deleteSubImage error:", err);
      return res.status(500).json({
        ok: false,
        message: "internal server error",
      });
    }
};

export { addSubImages, deleteSubImage };