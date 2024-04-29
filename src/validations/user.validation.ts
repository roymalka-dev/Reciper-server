import * as yup from "yup";
const safeTextRegex = /^[a-zA-Z0-9\s.,'-]+$/;
export const userValidations = {
  userSignIn: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
  userSignUp: yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
  editUserDetails: yup.object().shape({
    firstName: yup.string().required().min(3).max(50),
    lastName: yup.string().required().min(3).max(50),
    image: yup.string().optional(),
  }),
  editRecipe: yup.object().shape({
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
