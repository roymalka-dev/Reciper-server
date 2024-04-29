import { redis } from "../db/redis";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const redisCache: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  ttl: number = 3600
) => {
  if (req.method !== "GET") {
    return next();
  }

  const key = `redis-cache-${req.originalUrl || req.url}`;

  try {
    const cachedData = await redis.get(key);
    if (cachedData != null) {
      res.setHeader("X-Cache", "HIT");
      res.send(JSON.parse(cachedData));
    } else {
      const originalSend = res.send.bind(res);
      res.send = (body: any): Response<any, Record<string, any>> => {
        redis
          .set(key, JSON.stringify(body), "EX", ttl)
          .catch((err: any) => console.error("Redis set error:", err));
        return originalSend(body);
      };
      next();
    }
  } catch (err) {
    console.error("Redis get error:", err);
    next(err);
  }
};
