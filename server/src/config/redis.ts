// import redis from "redis";
// import IORedis from "ioredis";
import { RedisOptions } from "bullmq";

export const bullRedisConfig: RedisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};
