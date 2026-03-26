import type { Request, Response } from "express";
import { eventModel } from "../models/eventModel.js";
import uploadimage from "./uploadtoS3.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../utils/s3client.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addOrEditThumbnail = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    if (!req.file) {
      return res.status(400).json({
        ok: false,
        message: "thumbnail image is required",
      });
    }

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "event not found",
      });
    }

    const s3Key = await uploadimage(
      req.file.originalname,
      req.file.buffer
    );

    event.eventThumbnailKey = s3Key;
    await event.save();

    return res.status(200).json({
      ok: true,
      message: "thumbnail uploaded successfully",
      thumbnailKey: s3Key,
    });
  } catch (err) {
    console.error("addOrEditThumbnail error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};

const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const event = await eventModel.findById(eventId);
    if (!event || !event.eventThumbnailKey) {
      return res.status(404).json({
        ok: false,
        message: "thumbnail not found",
      });
    }

    const thumbnailKey = event.eventThumbnailKey;

    // ─── LOCAL FILE DELETION FALLBACK ───
    if (process.env.NODE_ENV === "local") {
      const filePath = path.resolve(__dirname, "..", "..", "uploads", thumbnailKey);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("📁 Local file deleted:", filePath);
      }
    } else {
      // ─── ORIGINAL S3 DELETE (production) ───
      const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: thumbnailKey,
      };

      const command = new DeleteObjectCommand(deleteParams);
      await s3Client!.send(command);
    }

    // REMOVE FROM DB
    event.eventThumbnailKey = "";
    await event.save();

    return res.status(200).json({
      ok: true,
      message: "thumbnail deleted successfully",
    });
  } catch (err) {
    console.error("deleteThumbnail error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};


export { addOrEditThumbnail, deleteThumbnail };