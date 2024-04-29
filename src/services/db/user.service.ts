import User from "../../models/user.model";
import { IUser } from "../../types/db.types";

export const userService = {
  getUserByEmail: async (email: string): Promise<IUser | null> => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id: string): Promise<IUser | null> => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  },
  addUser: async (newUserDetails: any): Promise<IUser> => {
    try {
      const newUser = await User.create(newUserDetails);
      return newUser;
    } catch (error) {
      throw error;
    }
  },
  addRecipe: async (userId: string, recipeId: string): Promise<IUser> => {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { recipes: recipeId } },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new Error(`User with name ${userId} not found`);
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
  editUserDetails: async (
    userId: string,
    firstName: string,
    lastName: string,
    image: string
  ): Promise<IUser> => {
    try {
      const updateFields: any = {};
      if (firstName !== "") {
        updateFields.firstName = firstName;
      }
      if (lastName !== "") {
        updateFields.lastName = lastName;
      }
      if (image !== "") {
        updateFields.image = image;
      }

      const user = await User.findByIdAndUpdate(userId, updateFields, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
  removeUserImage: async (userId: string, path: string): Promise<IUser> => {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { image: "" },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
};
