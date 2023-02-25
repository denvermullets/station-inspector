import { ingestCar } from "./workers/ingestCars";

// add bullmq worker queues
ingestCar();
