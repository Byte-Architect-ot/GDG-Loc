import multer from "multer";
import type { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only image files (jpeg, png, webp) are allowed"
      )
    );
  }
};

export const imageUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB (recommended for images)
  },
});
