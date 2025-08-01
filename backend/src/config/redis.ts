import { createClient } from 'redis';
import { logger } from '../utils/logger';

let redisClient: ReturnType<typeof createClient> | null = null;

export const connectRedis = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      logger.info('Skipping Redis connection in test environment');
      return;
    }

    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redisClient = createClient({
      url: redisUrl,
    });

    redisClient.on('error', (err) => {
      logger.error(`Redis Client Error: ${err}`);
    });

    redisClient.on('connect', () => {
      logger.info('🔴 Redis Client Connected');
    });

    redisClient.on('ready', () => {
      logger.info('🔴 Redis Client Ready');
    });

    await redisClient.connect();
  } catch (error) {
    logger.error(`Redis connection error: ${error}`);
    // Don't exit process for Redis connection failure in development
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export const getRedisClient = () => {
  return redisClient;
};

export const disconnectRedis = async () => {
  if (redisClient) {
    await redisClient.disconnect();
    redisClient = null;
  }
};
