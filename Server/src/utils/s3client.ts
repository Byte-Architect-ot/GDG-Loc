import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

// ─── S3 Client ───
// When NODE_ENV=local, we skip S3 entirely (local file storage is used instead).
// The original S3 client creation code is preserved for production use.

let s3Client: S3Client | null = null;

if (process.env.NODE_ENV !== "local") {
  s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
}

export default s3Client;