import { FastifyInstance } from "fastify";
import refreshController from "../../controllers/auth/refresh.controller.js";
import { refreshSchema } from "../../schema/refresh.schema.js";
import { RefreshRequest } from "../../types/refresh.types.js";

export default async function refreshRoute(fastify: FastifyInstance) {
  fastify.post<RefreshRequest>(
    "/refresh",
    refreshSchema,
    refreshController
  );
}
