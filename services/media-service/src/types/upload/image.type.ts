import { Readable } from "stream";
import { UUID } from "crypto";

export type UploadImageInput = {
  stream: Readable;
  mimetype: string;
  userId: UUID;
};
export type UploadImageResult = {
  fileId: UUID;
  path: string;
};