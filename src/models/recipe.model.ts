import mongoose, { Document, Schema } from "mongoose";
import { IRecipe, IUser } from "../types/db.types";
import { date } from "yup";

const recipeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    performingUser: { type: Schema.Types.ObjectId, required: true },
    instructions: [{ type: String, required: true }],
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
