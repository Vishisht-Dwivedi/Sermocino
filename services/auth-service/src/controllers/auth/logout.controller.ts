import {FastifyRequest, FastifyReply} from "fastify";
import { LogoutRequest } from "../../types/logout.types.js";
import logoutUser from "../../service/logout.service.js";

export default async function logoutController(
    request: FastifyRequest<LogoutRequest>,
    reply: FastifyReply
) {
    const refreshToken = request.cookies.refreshToken;
    reply.clearCookie('refreshToken', { path: '/auth/refresh' });
    const userObject = request.user;
    const result = await logoutUser(userObject, refreshToken||"");
    return reply.code(result.code).send(result);
}