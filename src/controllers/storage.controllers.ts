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
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  removeImage: async (req: Request, res: Response) => {
    const id = req.user.id;
    try {
      const { name } = req.params;
      const path = `src/uploads/images/${name}`;

      fs.unlink(path, (err) => {
        if (err) {
          throw err;
        }
      });
      await imageService.removeImage(path);
      await userService.removeUserImage(id, path);
      return res.status(200).json({ message: "File removed successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  getImage: async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const imagePath = path.join(__dirname, "..", "uploads", "images", name);

      console.log(imagePath);

      fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
          return res.status(404).send("Image not found");
        }

        const mimeType =
          path.extname(imagePath).toLowerCase() === ".png"
            ? "image/png"
            : path.extname(imagePath).toLowerCase() === ".jpg" ||
              path.extname(imagePath).toLowerCase() === ".jpeg"
            ? "image/jpeg"
            : "application/octet-stream";

        res.setHeader("Content-Type", mimeType);

        const readStream = fs.createReadStream(imagePath);
        readStream.pipe(res);
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
