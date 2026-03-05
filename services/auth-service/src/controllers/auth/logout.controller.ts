import {FastifyRequest, FastifyReply} from "fastify";
import { LogoutRequest } from "../../types/logout.types.js";
import logoutUser from "../../service/logout.service.js";

export default async function logoutController(
    request: FastifyRequest<LogoutRequest>,
    reply: FastifyReply
) {
    const refreshToken = request.cookies.refreshToken;
    const tokenString = request.headers.authorization;
    reply.clearCookie('refreshToken', { path: '/auth/refresh' });
    if(!tokenString || !refreshToken){
        return reply.send({
            ok: true,
            code: 200,
            data: {
                message: "Logout Successful"
            }
        });
    }
    const tokenArray = tokenString.split(" ");
    if(tokenArray[0] != "Bearer"){
        return reply.send({
            ok: true,
            code: 200,
            data: {
                message: "Logout Successful"
            }
        })
    }
    const accessToken = tokenArray[1];
    const result = await logoutUser(accessToken, refreshToken);
    return reply.code(result.code).send(result);
}