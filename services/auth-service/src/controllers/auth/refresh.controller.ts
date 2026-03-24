import { FastifyReply, FastifyRequest } from "fastify"
import { RefreshRequest } from "../../types/refresh.types.js";
import refreshUser from "../../service/refresh.service.js";
import { UAParser } from "ua-parser-js";

export default async function refreshController(
  request: FastifyRequest<RefreshRequest>,
  reply: FastifyReply
) {
    const refreshToken = request.signedCookies.refreshToken;
    if(!refreshToken) {
        return reply.code(401).send({
            ok: false,
            code: 401,
            error: {
                type: "AUTH_INVALID_CREDENTIALS",
                message: "Missing refresh token cookie"
            }
        })
    }
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

    const res = await refreshUser(refreshToken, meta);
    if(!res.ok){
        reply.clearCookie('refreshToken', { path: '/' });
        return reply.code(res.code).send(res);
    }
    reply.setCookie("refreshToken", res.data?.refreshToken??"", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        signed: true,
        maxAge: 7*24*60*60
    });
    return reply.code(res.code).send({
        ok: true,
        code: 200,
        data: {
            accessToken: res.data?.accessToken
        }
    })
}