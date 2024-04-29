import axios from "axios";
import { query } from "express";
import dotenv from "dotenv";
dotenv.config();

const app_id = process.env.EDAMAM_APP_ID;
const app_key = process.env.EDAMAM_APP_KEY;

export const recipeApiService = {
  queryRecipes: async (query: string): Promise<any> => {
    try {
      const encodedQuery = encodeURIComponent(query);

      const response = await axios.get(
        `https://api.edamam.com/search?q=${encodedQuery}&app_id=${app_id}&app_key=${app_key}`
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API error:", error.response?.data || error.message);
        throw new Error(
          `API error: ${error.response?.statusText || error.message}`
        );
      } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  },
  getRandomRecipes: async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=popular&app_id=${app_id}&app_key=${app_key}&random=true`
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API error:", error.response?.data || error.message);
        throw new Error(
          `API error: ${error.response?.statusText || error.message}`
        );
      } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  },
};
