import { Worker } from "bullmq";
import redis from "../lib/redis.js";

new Worker(
  "email-queue",
  async (job) => {
    console.log("Processing job:", job.name, job.data);
    const { email, otp } = job.data;
    console.log(`Sending OTP ${otp} to ${email}`);
  },
  {
    connection: redis,
  }
);