import { Request, Response } from "express";
import { imageService } from "../services/db/image.service";
import fs from "fs";
import path from "path";
import { userService } from "../services/db/user.service";
export const storageControllers = {
  uploadImage: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      await imageService.saveImage(req.file.path);
      return res
        .status(200)
        .json({ message: "File uploaded successfully", path: req.file.path });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
  removeImage: async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
      const { name } = req.params;
      const imagePath = path.resolve(__dirname, "../../uploads/images", name);

      await fs.promises.unlink(imagePath);
      await imageService.removeImage(imagePath);
      await userService.removeUserImage(userId, imagePath);
      return res.status(200).json({ message: "File removed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  getImage: async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const imagePath = path.resolve(__dirname, "../../uploads/images", name);

      console.log(`Serving image from: ${imagePath}`);

      const mimeType =
        path.extname(imagePath).toLowerCase() === ".png"
          ? "image/png"
          : path
              .extname(imagePath)
              .toLowerCase()
              .match(/\.(jpg|jpeg)$/)
          ? "image/jpeg"
          : "application/octet-stream";

      res.setHeader("Content-Type", mimeType);
      const readStream = fs.createReadStream(imagePath);
      readStream.pipe(res);
    } catch (error) {
      console.error(error);
      if (error === "ENOENT") {
        return res.status(404).send("Image not found");
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
