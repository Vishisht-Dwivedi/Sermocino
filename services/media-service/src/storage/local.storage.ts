import fs from "fs";
import path from "path";

const BASE_PATH = "/app/storage/tmp/raw";

export const saveTempFile = async (buffer: Buffer, fileId: string) => {
  const filePath = path.join(BASE_PATH, fileId);

  await fs.promises.writeFile(filePath, buffer);

  return filePath;
};