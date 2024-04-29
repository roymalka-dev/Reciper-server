import { storageControllers } from "../../controllers/storage.controllers";
import Recipe from "../../models/recipe.model";

export const recipeService = {
  queryRecipes: async (query: string): Promise<any> => {
    try {
      const recipes = await Recipe.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }).exec();

      return recipes;
    } catch (error) {
      console.error("Error querying recipes:", error);
      throw error;
    }
  },
  createRecipe: async (details: any, user: string): Promise<any> => {
    try {
      const newRecipe = await Recipe.create({
        ...details,
        performingUser: user,
      });

      return newRecipe;
    } catch (error) {
      throw error;
    }
  },
  editRecipe: async (id: string, details: any): Promise<any> => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, details, {
        new: true,
        runValidators: true,
      });

      if (!updatedRecipe) {
        throw new Error("No recipe found with the given ID.");
      }

      return updatedRecipe;
    } catch (error) {
      console.error("Error updating recipe:", error);
      throw new Error(`Failed to update recipe: ${error}`);
    }
  },
  getRecipesByIds: async (ids: string[]): Promise<any> => {
    try {
      const recipes = await Recipe.find({ _id: { $in: ids } }).exec();

      return recipes;
    } catch (error) {
      throw error;
    }
  },
  deleteRecipe: async (id: string): Promise<any> => {
    try {
      await Recipe.findByIdAndDelete(id).exec();

      return true;
    } catch (error) {
      throw error;
    }
  },
};
