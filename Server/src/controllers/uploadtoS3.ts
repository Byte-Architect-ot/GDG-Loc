import s3Client from "../utils/s3client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadimage = async (filename: string, filebuffer: Buffer) => {
    const s3key = `images/${Date.now()}_${filename}`;

    // ─── LOCAL FILE STORAGE FALLBACK ───
    if (process.env.NODE_ENV === "local") {
        try {
            const uploadsDir = path.resolve(__dirname, "..", "..", "uploads", "images");
            fs.mkdirSync(uploadsDir, { recursive: true });
            const filePath = path.join(uploadsDir, `${Date.now()}_${filename}`);
            fs.writeFileSync(filePath, filebuffer);
            const localKey = `images/${path.basename(filePath)}`;
            console.log("📁 File saved locally:", localKey);
            return localKey;
        } catch (err) {
            console.error("Local upload failed:", err);
            throw err;
        }
    }

    // ─── ORIGINAL S3 UPLOAD (production) ───
    try {
        const uploadparam = {
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: s3key,
            Body: filebuffer,
            // ACL: "public-read",
        }

        const command = new PutObjectCommand(uploadparam as any)
        await s3Client!.send(command);
        console.log("File uploaded successfully:", filename);
        return s3key;

    } catch (err) {
        console.error("Upload failed:", err);
        throw err;
    }
}


export default uploadimage;