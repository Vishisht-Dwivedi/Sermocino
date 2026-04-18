import crypto from "crypto";
import fs from "fs";
import { pipeline } from "stream/promises";
import { UploadImageInput, UploadImageResult } from "../../types/upload/image.type.js";
import { imageQueue } from "../../lib/image-queue.js";
import { ImageMetaData } from "@sermocino/shared";

export const uploadImageService = async (
  input: UploadImageInput
): Promise<UploadImageResult> => {
  const { stream, mimetype, userId } = input;

  if (!mimetype.startsWith("image/")) {
    throw new Error("INVALID_FILE_TYPE");
  }

  const fileId = crypto.randomUUID();
  const extension = mimetype.split("/")[1] || "bin";
  const path = `./uploads/${fileId}.${extension}`;

  fs.mkdirSync("./uploads", { recursive: true });

  const writeStream = fs.createWriteStream(path);

  await pipeline(stream, writeStream);

  await imageQueue.add(
    "process-image",
    {
      fileId,
      path,
      mimetype,
      userId
    } satisfies ImageMetaData,
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000
      }
    }
  );

  return { fileId, path };
};