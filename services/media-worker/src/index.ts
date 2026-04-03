import { processImage } from "./processors/image.processor.js";
import { Worker } from "bullmq";
new Worker(
    "media-queue", 
    async (job) => {
        switch (job.name) {
            case "process-image":
                console.log("Processing Image: ", job.data);
                await processImage(job.data);
                break;
        }
    },
    {
        connection: {
            host: process.env.REDIS_HOST || "localhost",
            port: Number(process.env.REDIS_PORT) || 6379,
            maxRetriesPerRequest: null,
        },
        concurrency: 5
  }
)