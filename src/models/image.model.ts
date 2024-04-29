import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
});

export const ImageModel = mongoose.model("Image", imageSchema);
