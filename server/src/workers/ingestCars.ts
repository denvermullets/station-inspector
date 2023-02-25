import IORedis from "ioredis";
import { Queue, Worker } from "bullmq";
import { bullRedisConfig } from "../config/redis";

const connection = new IORedis(bullRedisConfig);
const ingestQueue = new Queue("Ingest", { connection });

export const ingestCar = async (): Promise<void> => {
  const carWorker = new Worker(
    "Ingest",
    async (job) => {
      // process ingestion
    },
    { connection }
  );

  carWorker.on("error", (err: Error): void => {
    console.log(`error ${err}`);
  });

  carWorker.on("completed", (job, result): void => {
    console.log(`job completed`, job, result);
  });

  carWorker.on("failed", (job, err) => {
    console.log(`${job} has failed with error ${err}`);
  });

  console.log("Send me them Car Records");
};

export const addCarToQueue = async (payload: any): Promise<void> => {
  await ingestQueue.add("ingestCar", {});
};
