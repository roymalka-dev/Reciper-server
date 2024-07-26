import { recipeApiService } from "../services/api/recipe.api.service";
import { Request, Response } from "express";
import { recipeService } from "../services/db/recipe.service";
import { formatRecipeApiData } from "../utils/recpie.utils";
import Recipe from "../models/recipe.model";
import { chatService } from "../services/db/chat.service";
import { userService } from "../services/db/user.service";

export const recipeControllers = {
  queryRecipes: async (req: Request, res: Response) => {
    const query = req.query.q;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        message: 'Query parameter "q" is required and must be a string.',
      });
    }

    let data;

    try {
      if (query === "random") {
        const apiRandData = await recipeApiService.getRandomRecipes();
        data = apiRandData.hits.map((data: any) =>
          formatRecipeApiData(data.recipe)
        );
      } else {
        const apiData = await recipeApiService.queryRecipes(query);
        const formattedApiData = apiData.hits.map((data: any) =>
          formatRecipeApiData(data.recipe)
        );
        let dbData = await recipeService.queryRecipes(query);

        dbData = await Promise.all(
          dbData.map(async (data: any) => {
            const user = await userService.getUserById(data.performingUser);
            return {
              ...data.toJSON(),
              performingUser: user?.email || "Unknown",
            };
          })
        );

        const recipes = [...dbData, ...formattedApiData];

        data = recipes;
      }

      return res.status(200).json({ data: data });
    } catch (error: any) {
      return res.status(500).json({
        message: "Failed to fetch recipes due to an internal error.",
        error: error.message,
      });
    }
  },
  getRecipeById: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: 'Parameter "id" is required and must be a string.',
      });
    }

    let data;
    try {
      if (id.length === 24) {
        data = await Recipe.findById(id).exec();

        const user =
          data && (await userService.getUserById(data.performingUser));

        if (data && user) {
          data = {
            ...data.toJSON(),
            performingUser: user.email,
          };
        }
      } else if (id.length === 32) {
        const apiData = await recipeApiService.queryRecipes(id);
        data = formatRecipeApiData(apiData.hits[0].recipe);
      } else {
        return res.status(404).json({ message: "Recipe not found." });
      }

      return res.status(200).json({ data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch recipe due to an internal error." });
    }
  },
  getRecipeChat: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: 'Parameter "id" is required and must be a string.',
      });
    }

    try {
      const chat = await chatService.getChat(id);

      return res.status(200).json({ data: chat });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch chat due to an internal error." });
    }
  },
  createRecipe: async (req: Request, res: Response) => {
    const { name, description, instructions, image } = req.body;
    const userId = req.user.id;

    try {
      const newRecipe = await recipeService.createRecipe(
        { name, description, instructions, image: image },
        userId
      );

      userService.addRecipe(userId, newRecipe._id.toString());

      return res.status(200).json({ data: newRecipe });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create recipe due to an internal error." });
    }
  },
};
