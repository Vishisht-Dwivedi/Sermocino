import { FastifyReply, FastifyRequest } from "fastify"
import { LoginRequest } from "../../types/login.types.js"
import loginUser from "../../service/login.service.js"
import { LoginSchema } from "@sermocino/shared";

export default async function loginController(
  request: FastifyRequest<LoginRequest>,
  reply: FastifyReply
) {
  const body = LoginSchema.parse(request.body);
  const result = await loginUser(body);
  if(result.code===200 && result.data){

    reply.setCookie("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/auth/refresh",
      signed: true,
      maxAge: 7*24*60*60
    });

    return reply.code(200).send({
      ok: true,
      code: 200,
      data: {
        accessToken: result.data.accessToken
      }
    });
  }
  return reply.code(result.code).send(result)
}