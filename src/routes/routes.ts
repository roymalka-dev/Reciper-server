import { authenticator } from "../middleware/authenticator";
import { redisCache } from "../middleware/redis";
import { RouteType } from "../types/routes.types";
import { authEndpoints } from "./endpoints/auth.endpoints";
import { recpieEndpoints } from "./endpoints/recpie.endpoints";
import { storageEndpoints } from "./endpoints/storage.endpoints";
import { userEndpoints } from "./endpoints/user.endpoints";

export const routes: RouteType[] = [
  {
    name: "auth",
    path: "/auth",
    endpoints: [...authEndpoints],
    middleware: [],
  },
  {
    name: "user",
    path: "/user",
    endpoints: [...userEndpoints],
    middleware: [authenticator],
  },
  {
    name: "recipe",
    path: "/recipe",
    endpoints: [...recpieEndpoints],
    middleware: [authenticator],
  },
  {
    name: "storage",
    path: "/storage",
    endpoints: [...storageEndpoints],
    middleware: [],
  },
];
