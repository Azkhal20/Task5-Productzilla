import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
});

export const cacheMiddleware = (duration: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedResponse = await redis.get(key);
      if (cachedResponse) {
        return res.json(JSON.parse(cachedResponse));
      }

      const originalJson = res.json;
      res.json = ((data: any) => {
        redis.setex(key, duration, JSON.stringify(data));
        return originalJson.call(res, data);
      }) as any;

      next();
    } catch (error) {
      console.error('Cache error:', error);
      next();
    }
  };
};
