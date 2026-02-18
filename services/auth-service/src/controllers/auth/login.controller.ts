import { FastifyReply, FastifyRequest } from "fastify";
import { LoginRequest } from "../../types/login.types.js";
import loginUser from "../../service/login.service.js";

export default async function loginController(
  request: FastifyRequest<LoginRequest>,
  reply: FastifyReply
) {
  const result = await loginUser(request.body);

  if (result.status === "ok") {
    return reply.code(200).send({
      status: "ok",
      data: result.data
    });
  }

  if (result.status === "error" && result.code === "invalid") {
    return reply.code(401).send({
      status: "error",
      data: {
        type: "invalid_credentials"
      }
    });
  }

  return reply.code(500).send({
    status: "error",
    data: {
      type: "server_error",
      message: "Internal Server Error"
    }
  });
}
