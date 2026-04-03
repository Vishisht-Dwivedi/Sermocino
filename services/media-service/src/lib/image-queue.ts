import { Queue } from "bullmq";
import redis from "./redis.js";

export const imageQueue = new Queue("media-queue", {
  connection: redis,
});