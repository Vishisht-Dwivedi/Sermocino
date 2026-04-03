import { UUID } from "node:crypto"

export type ImageMetaData = {
    fileId: UUID,
    path: string,
    mimetype: string,
    userId: UUID
}