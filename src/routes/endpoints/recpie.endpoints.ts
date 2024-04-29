import { recipeControllers } from "../../controllers/recipe.controllers";
import { redisCache } from "../../middleware/redis";
import { EndpointType } from "../../types/routes.types";
import { validateRequest } from "../../middleware/validator";
import { recipeValidations } from "../../validations/recipe.validation";

export const recpieEndpoints: EndpointType[] = [
  /**
   * @openapi
   * api/recipe/query-recipe:
   *   get:
   *     summary: Query recipes
   *     description: Fetches recipes based on a search query or randomly if 'random' is specified as the query.
   *     tags:
   *       - Recipes
   *     parameters:
   *       - in: query
   *         name: q
   *         schema:
   *           type: string
   *         required: true
   *         description: Query string to search recipes or 'random' for random recipes.
   *     responses:
   *       200:
   *         description: Successfully retrieved recipes.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Recipe'
   *       400:
   *         description: Missing or invalid query parameter.
   *       500:
   *         description: Internal server error.
   */
  {
    name: "query-recipe",
    method: "get",
    path: "/query-recipe",
    controller: recipeControllers.queryRecipes,
    middleware: [
      validateRequest(recipeValidations.queryRecipes, "query"),
      redisCache,
    ],
    authority: "USER",
  },

  /**
   * @openapi
   * api/recipe//get-recipe/{id}:
   *   get:
   *     summary: Get recipe by ID
   *     description: Fetches a recipe by its database ID or a specific API ID.
   *     tags:
   *       - Recipes
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Unique identifier of the recipe to retrieve.
   *     responses:
   *       200:
   *         description: Successfully retrieved recipe.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Recipe'
   *       400:
   *         description: Missing or invalid ID parameter.
   *       404:
   *         description: Recipe not found.
   *       500:
   *         description: Internal server error.
   */
  {
    name: "get-recipe-by-id",
    method: "get",
    path: "/get-recipe/:id",
    controller: recipeControllers.getRecipeById,
    middleware: [validateRequest(recipeValidations.getRecipeById, "params")],
    authority: "USER",
  },

  /**
   * @openapi
   * api/recipe/get-recipe-chat/{id}:
   *   get:
   *     summary: Get chat for recipe
   *     description: Fetches chat history associated with a specific recipe ID.
   *     tags:
   *       - Recipes
   *       - Chat
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Unique identifier of the recipe to retrieve chat for.
   *     responses:
   *       200:
   *         description: Successfully retrieved chat.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       message:
   *                         type: string
   *                       user:
   *                         type: string
   *       400:
   *         description: Missing or invalid ID parameter.
   *       500:
   *         description: Internal server error.
   */
  {
    name: "get-recipe-chat",
    method: "get",
    path: "/get-recipe-chat/:id",
    controller: recipeControllers.getRecipeChat,
    middleware: [validateRequest(recipeValidations.getRecipeChat, "params")],
    authority: "USER",
  },

  /**
   * @openapi
   * api/recipe/create-recipe:
   *   post:
   *     summary: Create a new recipe
   *     description: Adds a new recipe to the database.
   *     tags:
   *       - Recipes
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               instructions:
   *                 type: string
   *               image:
   *                 type: string
   *                 format: uri
   *             required:
   *               - name
   *               - description
   *               - instructions
   *     responses:
   *       200:
   *         description: Successfully created recipe.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Recipe'
   *       500:
   *         description: Internal server error.
   */
  {
    name: "create-recipe",
    method: "post",
    path: "/create-recipe",
    controller: recipeControllers.createRecipe,
    middleware: [validateRequest(recipeValidations.createRecipe, "body")],
    authority: "USER",
  },
];
