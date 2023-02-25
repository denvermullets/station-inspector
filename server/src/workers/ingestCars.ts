import IORedis from "ioredis";
import { Job, Queue, Worker } from "bullmq";
import { bullRedisConfig } from "../config/redis";
import { CarPayload } from "../models/vehicle.model";
import { ingestCarRecord } from "../processor/carWorker.processor";

const connection = new IORedis(bullRedisConfig);
const ingestQueue = new Queue("Ingest", { connection });

export const ingestCar = async (): Promise<void> => {
  const carWorker = new Worker("Ingest", ingestCarRecord, { connection });

  carWorker.on("error", (err: Error): void => {
    console.log(`error ${err}`);
  });

  carWorker.on("completed", (job: Job): void => {
    console.log(`job ${job.id} completed`);
  });

  carWorker.on("failed", (job, err) => {
    console.log(`${job} has failed with error ${err}`);
  });

  console.log("Worker is ready to ingest car records");
};

export const addCarToQueue = async (payload: CarPayload): Promise<void> => {
  await ingestQueue.add("ingestCar", payload);
};
