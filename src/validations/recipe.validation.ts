import { create } from "domain";
import * as yup from "yup";

const safeTextRegex = /^[a-zA-Z0-9\s.,'-]+$/;

export const recipeValidations = {
  queryRecipes: yup.object().shape({
    q: yup
      .string()
      .required()
      .min(3)
      .max(50)
      .matches(safeTextRegex, "Query contains invalid characters"),
  }),
  getRecipeById: yup.object().shape({
    id: yup
      .string()
      .required()
      .test(
        "len",
        "ID must be exactly 24 or 32 characters long",
        (val) => val.length === 24 || val.length === 32
      ),
  }),
  getRecipeChat: yup.object().shape({
    id: yup
      .string()
      .required()
      .test(
        "len",
        "ID must be exactly 24 or 32 characters long",
        (val) => val.length === 24 || val.length === 32
      ),
  }),
  createRecipe: yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name can be no longer than 50 characters")
      .matches(safeTextRegex, "Name contains invalid characters"),
    description: yup
      .string()
      .required("Description is required")
      .min(3, "Description must be at least 3 characters long")
      .max(200, "Description can be no longer than 200 characters")
      .matches(safeTextRegex, "Description contains invalid characters"),

    instructions: yup
      .array()
      .of(
        yup
          .string()
          .required("Each instruction must be a string")
          .matches(safeTextRegex, "Instructions contain invalid characters")
      )
      .min(1, "At least one instruction is required"),
    image: yup.string().optional(),
  }),
};
