import { storageControllers } from "../../controllers/storage.controllers";
import { authenticator } from "../../middleware/authenticator";
import { imageUploader } from "../../middleware/imageUploader";
import { redisCache } from "../../middleware/redis";
import { EndpointType } from "../../types/routes.types";

export const storageEndpoints: EndpointType[] = [
  /**
   * @openapi
   * api/storage//upload-image:
   *   post:
   *     summary: Upload an image
   *     description: Uploads an image file to the server.
   *     tags:
   *       - Storage
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: Image file to upload.
   *     responses:
   *       200:
   *         description: File uploaded successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "File uploaded successfully"
   *                 path:
   *                   type: string
   *                   example: "/uploads/images/example.jpg"
   *       400:
   *         description: No file uploaded.
   *       500:
   *         description: Internal server error.
   */
  {
    name: "upload-image",
    method: "post",
    path: "/upload-image",
    controller: storageControllers.uploadImage,
    middleware: [authenticator, imageUploader],
    authority: "USER",
  },

  /**
   * @openapi
   * api/storage//remove-image/{name}:
   *   delete:
   *     summary: Remove an image
   *     description: Deletes an image file from the server.
   *     tags:
   *       - Storage
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: name
   *         required: true
   *         schema:
   *           type: string
   *         description: The filename of the image to delete.
   *     responses:
   *       200:
   *         description: File removed successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "File removed successfully"
   *       500:
   *         description: Internal server error.
   */
  {
    name: "remove-image",
    method: "delete",
    path: "/remove-image/:name",
    controller: storageControllers.removeImage,
    middleware: [authenticator],
    authority: "USER",
  },

  /**
   * @openapi
   * api/storage/get-image/{name}:
   *   get:
   *     summary: Retrieve an image
   *     description: Fetches an image file from the server based on the filename.
   *     tags:
   *       - Storage
   *     parameters:
   *       - in: path
   *         name: name
   *         required: true
   *         schema:
   *           type: string
   *         description: The filename of the image to retrieve.
   *     responses:
   *       200:
   *         description: Image retrieved successfully.
   *         content:
   *           image/png:
   *             schema:
   *               type: string
   *               format: binary
   *           image/jpeg:
   *             schema:
   *               type: string
   *               format: binary
   *           application/octet-stream:
   *             schema:
   *               type: string
   *               format: binary
   *       404:
   *         description: Image not found.
   *       500:
   *         description: Internal server error.
   */
  {
    name: "get-image",
    method: "get",
    path: "/get-image/:name",
    controller: storageControllers.getImage,
    middleware: [],
    authority: "USER",
  },
];
