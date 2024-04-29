import multer from "multer";
import { Request } from "express";

export const imagesStorageConfig = () => {
  const storage: multer.StorageEngine = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      cb(null, "src/uploads/images");
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  });

  return multer({ storage: storage });
};
