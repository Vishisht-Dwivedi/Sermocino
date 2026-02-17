import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterRequest } from "../../types/register.types.js";
import registerUser from "../../service/register.service.js";

export default async function registerController(
  request: FastifyRequest<RegisterRequest>,
  reply: FastifyReply
) {
  const result = await registerUser(request.body);

  if (result.status === "ok") {
    return reply.code(201).send({
      status: "ok",
      data: result.data
    });
  }

  if (result.code === "conflict") {
    return reply.code(409).send({
      status: "error",
      data: {
        type: "duplicate",
        field: result.field
      }
    });
  }

  return reply.code(500).send({
    status: "error",
    body: { message: "Internal Server Error" }
  });
}
