import type { Request, Response } from "express";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { memberModel } from "../models/memberModel.js";
import uploadimage from "./uploadtoS3.js";
import s3Client from "../utils/s3client.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadMemberImage = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        ok: false,
        message: "image file is required",
      });
    }

    const member = await memberModel.findById(memberId);
    if (!member) {
      return res.status(404).json({
        ok: false,
        message: "member not found",
      });
    }

    // upload using existing utility (handles local/S3 automatically)
    const imageKey = await uploadimage(
      file.originalname,
      file.buffer
    );

    // update DB
    member.memberImageKey = imageKey;
    await member.save();

    return res.status(200).json({
      ok: true,
      memberImageKey: imageKey,
    });
  } catch (err) {
    console.error("uploadMemberImage error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};

const deleteMemberImage = async (req: Request, res: Response) => {
    try {
      const { memberId } = req.params;
  
      const member = await memberModel.findById(memberId);
      if (!member || !member.memberImageKey) {
        return res.status(404).json({
          ok: false,
          message: "member image not found",
        });
      }
  
      const imageKey = member.memberImageKey;
  
      // ─── LOCAL FILE DELETION FALLBACK ───
      if (process.env.NODE_ENV === "local") {
        const filePath = path.resolve(__dirname, "..", "..", "uploads", imageKey);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("📁 Local file deleted:", filePath);
        }
      } else {
        // ─── ORIGINAL S3 DELETE (production) ───
        await s3Client!.send(
          new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: imageKey,
          })
        );
      }
  
      // remove reference from DB
      member.memberImageKey = "";
      await member.save();
  
      return res.status(200).json({
        ok: true,
        message: "member image deleted successfully",
      });
    } catch (err) {
      console.error("deleteMemberImage error:", err);
      return res.status(500).json({
        ok: false,
        message: "internal server error",
      });
    }
  };
  

export { uploadMemberImage, deleteMemberImage };
