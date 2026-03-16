import { FastifyReply, FastifyRequest } from "fastify"
import { RegisterRequest } from "../../types/register.types.js"
import registerUser from "../../service/register.service.js"
import { RegisterSchema } from "@sermocino/shared"

export default async function registerController(
  request: FastifyRequest<RegisterRequest>,
  reply: FastifyReply
) {
  
  const body = RegisterSchema.parse(request.body)
  const result = await registerUser(body);
  return reply
    .code(result.code)
    .send(result)
}