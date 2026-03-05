import { FastifyReply, FastifyRequest } from "fastify"
import { RefreshRequest } from "../../types/refresh.types.js";
import refreshUser from "../../service/refresh.service.js";

export default async function refreshController(
  request: FastifyRequest<RefreshRequest>,
  reply: FastifyReply
) {
    const refreshToken = request.cookies.refreshToken;
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
    const res = await refreshUser(refreshToken);
    if(!res.ok){
        reply.clearCookie('refreshToken', { path: '/auth/refresh' });
        return reply.code(res.code).send(res);
    }
    reply.setCookie("refreshToken", res.data?.refreshToken??"", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/auth/refresh",
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