import { ImageModel } from "../../models/image.model";

export const imageService = {
  saveImage: async (imagePath: String): Promise<any> => {
    try {
      const image = new ImageModel({
        imagePath: imagePath,
      });
      await image.save();
      return image;
    } catch (error) {
      console.error("Error saving image:", error);
      throw error;
    }
  },
  removeImage: async (name: String): Promise<any> => {
    try {
      await ImageModel.findOneAndDelete({ imagePath: name });
    } catch (error) {
      console.error("Error removing image:", error);
      throw error;
    }
  },
};
