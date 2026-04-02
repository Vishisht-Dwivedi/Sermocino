import crypto from "crypto";
import { saveTempFile } from "../../storage/local.storage.js";

export const uploadImageService = async ({
  buffer,
  mimetype,
  userId
}: {
    buffer: Buffer;
    mimetype: string;
    userId: string;
}) => {
    if (!mimetype.startsWith("image/")) {
      throw new Error("INVALID_FILE_TYPE");
    }
    const fileId = crypto.randomUUID();
    const path = await saveTempFile(buffer, fileId);
    // TODO: create DB entry
    // TODO: push queue job
    return {
      fileId,
      path
    };
};