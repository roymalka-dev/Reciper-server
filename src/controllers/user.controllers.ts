import e, { Request, Response } from "express";
import { userService } from "../services/db/user.service";
import { recipeService } from "../services/db/recipe.service";
import { imageService } from "../services/db/image.service";
import fs from "fs";
export const userControllers = {
  getUserDetails: async (req: Request, res: Response) => {
    try {
      const email = req.user.email;

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
    }
  },
  editUserDetails: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, image } = req.body;
      const id = req.user.id;

      const user = await userService.editUserDetails(
        id,
        firstName,
        lastName,
        image
      );
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error.", error });
    }
  },
  getUserRecipes: async (req: Request, res: Response) => {
    try {
      const id = req.user.id;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const recipes = await recipeService.getRecipesByIds(user.recipes);
      console.log("recpies", recipes);
      return res.status(200).json({ data: recipes });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
    }
  },
  deleteRecipe: async (req: Request, res: Response) => {
    const { id } = req.params;

    const userId = req.user.id;

    //find the rcipe in userrcipes, if not there throw 403
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isUserRecipe = user.recipes.includes(id);

    if (!isUserRecipe) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this recipe." });
    }

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: 'Parameter "id" is required and must be a string.',
      });
    }

    //delte recipe from user.recipes
    await userService.deleteRecipeFromUser(id, userId);
    try {
      const recipe = await recipeService.getRecipesByIds([id]);
      await recipeService.deleteRecipe(id);

      if (recipe[0].image !== "") {
        const path = `src/uploads/images/${recipe[0].image}`;

        fs.unlink(path, (err) => {
          if (err) {
            throw err;
          }
        });
        await imageService.removeImage(path);
      }

      return res.status(200).json({ message: "Recipe deleted successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete recipe due to an internal error." });
    }
  },
  editRecipe: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, instructions, image } = req.body;
    const userId = req.user.id;

    //find the rcipe in userrcipes, if not there throw 403
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isUserRecipe = user.recipes.includes(id);

    if (!isUserRecipe) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this recipe." });
    }

    if (!instructions || !Array.isArray(instructions)) {
      return res.status(400).json({
        message: 'Parameter "instructions" is required and must be an array.',
      });
    }

    try {
      const updatedRecipe = await recipeService.editRecipe(id, {
        name,
        description,
        instructions,
        image,
      });

      return res.status(200).json({ data: updatedRecipe });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to edit recipe due to an internal error." });
    }
  },
};
