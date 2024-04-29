import { NextFunction, Request, Response, RequestHandler } from "express";
import { OAuth2Client } from "google-auth-library";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { userService } from "../services/db/user.service";
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
      };
    }
  }
}
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticator: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader)
      throw new Error("Authorization header is required");

    const [type, token] = authorizationHeader.split(" ");

    switch (type) {
      case "Bearer":
        await authenticateWithGoogle(token, req);
        break;
      case "Basic":
        await authenticateWithCredentials(token, req);
        break;
      default:
        throw new Error("Invalid authentication method");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(403).send({ error });
  }
};

async function authenticateWithGoogle(token: string, req: Request) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email)
    throw new Error("Email not found in token payload");

  let user = await userService.getUserByEmail(payload.email);
  if (!user) {
    const email = payload.email;
    const firstName = payload.given_name;
    const lastName = payload.family_name;
    const newUserDetails = {
      email,
      firstName,
      lastName,
      password: bcrypt.hashSync(email, 10),
      roles: ["USER"],
    };
    user = await userService.addUser(newUserDetails);
  }

  req.user = { id: user._id, email: user.email };
}

async function authenticateWithCredentials(token: string, req: Request) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? "");

    const { id } = decodedToken as { id: string; email: string };

    let user = await userService.getUserById(id);

    if (!user) throw new Error("User not found");
    req.user = { id: user._id, email: user.email };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
