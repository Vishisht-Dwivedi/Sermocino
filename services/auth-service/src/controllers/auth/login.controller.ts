import { FastifyReply, FastifyRequest } from "fastify"
import { LoginRequest } from "../../types/login.types.js"
import loginUser from "../../service/login.service.js"

export default async function loginController(
  request: FastifyRequest<LoginRequest>,
  reply: FastifyReply
) {
  const result = await loginUser(request.body);
  return reply
    .code(result.code)
    .send(result)
}