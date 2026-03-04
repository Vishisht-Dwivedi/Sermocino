import { FastifyReply, FastifyRequest } from "fastify"
import { RegisterRequest } from "../../types/register.types.js"
import registerUser from "../../service/register.service.js"

export default async function registerController(
  request: FastifyRequest<RegisterRequest>,
  reply: FastifyReply
) {
  const result = await registerUser(request.body);
  return reply
    .code(result.code)
    .send(result)
}