import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import { imagesStorageConfig } from "../configs/storage.config";
export const imageUploader: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const upload = imagesStorageConfig();

  const uploader = upload.single("image");

  uploader(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};
