import { FastifyInstance } from "fastify";
import registerController from "../../controllers/auth/register.controller.js";
import { RegisterRequest } from "../../types/register.types.js";
import { registerSchema } from "../../schema/register.schema.js";

export default async function registerRoute(fastify: FastifyInstance) {
  fastify.post<RegisterRequest>(
    "/register",
    registerSchema,
    registerController
  );
}
