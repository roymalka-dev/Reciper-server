import { Request, Response } from "express";
import { userService } from "../services/db/user.service";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
export const authControllers = {
  signIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET ?? "",
        {
          expiresIn: "12h",
        }
      );

      res
        .status(200)
        .json({
          message: "User signed in successfully",
          token,
          email: user.email,
        });
    } catch (error) {
      console.error("Error signing in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  signUp: async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const newUserDetails = {
        email,
        password,
        firstName,
        lastName,
        roles: ["USER"],
      };
      const newUser = await userService.addUser(newUserDetails);

      res
        .status(201)
        .json({ message: "User signed up successfully", user: newUser });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
