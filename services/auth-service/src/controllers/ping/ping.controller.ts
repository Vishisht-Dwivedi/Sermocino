import { FastifyReply, FastifyRequest } from "fastify";

export default async function pingController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return { pong: "it worked!" };
}
