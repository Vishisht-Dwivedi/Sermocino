import { FastifyInstance } from "fastify";
import { LoginRequest } from "../../types/login.types.js";
import { loginSchema } from "../../schema/login.schema.js";
import loginController from "../../controllers/auth/login.controller.js";

export default async function loginRoute(fastify: FastifyInstance) {
  fastify.post<LoginRequest>(
    "/login",
    loginSchema,
    loginController
  );
}
