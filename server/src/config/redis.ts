import { RedisOptions } from "bullmq";

export const bullRedisConfig: RedisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};
