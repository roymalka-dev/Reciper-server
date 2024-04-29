import { userControllers } from "../../controllers/user.controllers";
import { validateRequest } from "../../middleware/validator";
import { EndpointType } from "../../types/routes.types";
import { userValidations } from "../../validations/user.validation";

export const userEndpoints: EndpointType[] = [
  /**
   * @openapi
   * api/user/get-user-details:
   *   get:
   *     summary: Get user details
   *     description: Retrieves details of the currently logged-in user.
   *     tags:
   *       - User
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User details retrieved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found.
   *       500:
   *         description: Internal server error.
   */
  {
    name: "get-user-details",
    method: "get",
    path: "/get-user-details",
    controller: userControllers.getUserDetails,
    middleware: [],
    authority: "USER",
  },

  /**
   * @openapi
   * api/user/edit-details:
   *   put:
   *     summary: Edit user details
   *     description: Updates the details of the currently logged-in user.
   *     tags:
   *       - User
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               image:
   *                 type: string
   *                 format: uri
   *     responses:
   *       200:
   *         description: User details updated successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       500:
   *         description: Internal server error.
   */
  {
    name: "edit-details",
    method: "put",
    path: "/edit-details",
    controller: userControllers.editUserDetails,
    middleware: [validateRequest(userValidations.editUserDetails, "body")],
    authority: "USER",
  },

  /**
   * @openapi
   * api/user/get-user-recipes:
   *   get:
   *     summary: Get recipes of user
   *     description: Retrieves all recipes created by the currently logged-in user.
   *     tags:
   *       - User
   *       - Recipes
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Recipes retrieved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Recipe'
   *       404:
   *         description: User not found.
   *       500:
   *         description: Internal server error.
   */
  {
    name: "get-user-recipes",
    method: "get",
    path: "/get-user-recipes",
    controller: userControllers.getUserRecipes,
    middleware: [],
    authority: "USER",
  },

  /**
   * @openapi
   * api/user/delete-recipe/{id}:
   *   delete:
   *     summary: Delete a recipe
   *     description: Deletes a recipe owned by the currently logged-in user.
   *     tags:
   *       - User
   *       - Recipes
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Unique identifier of the recipe to delete.
   *     responses:
   *       200:
   *         description: Recipe deleted successfully.
   *       400:
   *         description: Invalid parameters.
   *       403:
   *         description: Unauthorized to delete this recipe.
   *       404:
   *         description: User or recipe not found.
   *       500:
   *         description: Failed to delete recipe due to an internal error.
   */
  {
    name: "delete-recipe",
    method: "delete",
    path: "/delete-recipe/:id",
    controller: userControllers.deleteRecipe,
    middleware: [],
    authority: "USER",
  },

  /**
   * @openapi
   * api/user/edit-recipe/{id}:
   *   put:
   *     summary: Edit a recipe
   *     description: Edits a recipe owned by the currently logged-in user.
   *     tags:
   *       - User
   *       - Recipes
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Unique identifier of the recipe to edit.
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
   *                 type: array
   *                 items:
   *                   type: string
   *               image:
   *                 type: string
   *                 format: uri
   *     responses:
   *       200:
   *         description: Recipe edited successfully.
   *       400:
   *         description: Invalid parameters.
   *       403:
   *         description: Unauthorized to edit this recipe.
   *       404:
   *         description: User or recipe not found.
   *       500:
   *         description: Failed to edit recipe due to an internal error.
   */
  {
    name: "edit-recipe",
    method: "put",
    path: "/edit-recipe/:id",
    controller: userControllers.editRecipe,
    middleware: [],
    authority: "USER",
  },
];
