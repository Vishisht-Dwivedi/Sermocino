import { ImageMetaData } from "@sermocino/shared";
import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const workerPath = path.join(__dirname, "../threads/image.thread.js");

export const processImage = async (data: ImageMetaData) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
        workerData: data
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
        if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
        }
    });
  });
};