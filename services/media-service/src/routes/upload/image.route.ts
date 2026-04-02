import { FastifyInstance } from "fastify";
import { uploadImageController } from "../../controllers/upload/image.controller.js";
import { imageSchema } from "../../schemas/upload/image.schema.js";

export default async function (fastify: FastifyInstance) {
  fastify.post(
    "/upload/image",
    {
      preHandler: fastify.authenticate,
      ...imageSchema
    },
    uploadImageController
  );
}