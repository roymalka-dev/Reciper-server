import { authControllers } from "../../controllers/auth.controllers";
import { validateRequest } from "../../middleware/validator";
import { EndpointType } from "../../types/routes.types";
import { userValidations } from "../../validations/user.validation";

export const authEndpoints: EndpointType[] = [
  /**
   * @openapi
   * api/auth/sign-in:
   *   post:
   *     summary: Sign in user
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: password
   *     responses:
   *       200:
   *         description: User signed in successfully
   *       400:
   *         description: Invalid request body
   *       401:
   *         description: Invalid email or password
   *       500:
   *         description: Internal server error
   */

  {
    name: "sign-in",
    method: "post",
    path: "/sign-in",
    controller: authControllers.signIn,
    middleware: [validateRequest(userValidations.userSignIn, "body")],
    authority: "PUBLIC",
  },

  /**
   * @openapi
   * api/auth/sign-up:
   *   post:
   *     summary: Registers a new user
   *     description: This endpoint registers a new user by adding them to the database.
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: user@example.com
   *                 description: User's email address.
   *               password:
   *                 type: string
   *                 format: password
   *                 example: password123
   *                 description: User's password.
   *               firstName:
   *                 type: string
   *                 example: John
   *                 description: User's first name.
   *               lastName:
   *                 type: string
   *                 example: Doe
   *                 description: User's last name.
   *             required:
   *               - email
   *               - password
   *               - firstName
   *               - lastName
   *     responses:
   *       201:
   *         description: User signed up successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "User signed up successfully"
   *                 user:
   *                   type: object
   *                   properties:
   *                     email:
   *                       type: string
   *                       example: user@example.com
   *                     firstName:
   *                       type: string
   *                       example: John
   *                     lastName:
   *                       type: string
   *                       example: Doe
   *                     roles:
   *                       type: array
   *                       items:
   *                         type: string
   *                         example: "USER"
   *       409:
   *         description: User already exists.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "User already exists"
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Internal server error"
   */

  {
    name: "sign-up",
    method: "post",
    path: "/sign-up",
    controller: authControllers.signUp,
    middleware: [validateRequest(userValidations.userSignUp, "body")],
    authority: "PUBLIC",
  },
];
