import crypto from "crypto";
import { saveTempFile } from "../../storage/local.storage.js";
import { imageQueue } from "../../lib/image-queue.js";
import { ImageMetaData } from "@sermocino/shared";

export const uploadImageService = async ({
  buffer,
  mimetype,
  userId
}: {
    buffer: Buffer;
    mimetype: string;
    userId: string
}) => {
  if (!mimetype.startsWith("image/")) {
    throw new Error("INVALID_FILE_TYPE");
  }
  const fileId = crypto.randomUUID();
  const path = await saveTempFile(buffer, fileId);
  await imageQueue.add("process-image", <ImageMetaData>{
    fileId,
    path,
    mimetype,
    userId
  }, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000
    }
  });
  return {
    fileId,
    path
  };
};