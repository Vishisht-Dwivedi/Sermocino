import { FastifyReply, FastifyRequest } from "fastify"
import { LoginRequest } from "../../types/login.types.js"
import loginUser from "../../service/login.service.js"
import { LoginSchema } from "@sermocino/shared";
import { UAParser } from 'ua-parser-js';

export default async function loginController(
  request: FastifyRequest<LoginRequest>,
  reply: FastifyReply
) {
  const ip = request.ip;
  const parser = new UAParser(request.headers["user-agent"]);
  const user_agent = parser.getResult();
  const meta = {
    ip,
    user_agent,
    device: user_agent.device.type || "desktop",
    os: user_agent.os.name,
    browser: user_agent.browser.name
  }
  const body = LoginSchema.parse(request.body);
  const result = await loginUser(body, meta);
  if(result.code===200 && result.data){
    console.log("Setting cookie");
    reply.setCookie("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
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