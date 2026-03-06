import { FastifyInstance } from "fastify";
import logoutController from "../../controllers/auth/logout.controller.js";
import { logoutSchema } from "../../schema/logout.schema.js";
import { LogoutRequest } from "../../types/logout.types.js";

export default async function logoutRoute(fastify: FastifyInstance) {
  fastify.post<LogoutRequest>(
  "/logout",
  {
    ...logoutSchema,
    preHandler: fastify.authenticate
  },
  logoutController
);
}
