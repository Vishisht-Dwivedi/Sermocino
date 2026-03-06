import fp from "fastify-plugin"
import { FastifyReply } from "fastify/types/reply.js"
import { FastifyRequest } from "fastify/types/request.js"
import jwt from "jsonwebtoken"
import { JWTPayload } from "../types/global.types.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default fp(async function (fastify){
  fastify.decorate(
    "authenticate", 
    async function (
        request: FastifyRequest, 
        reply: FastifyReply
    ){
    const auth = request.headers.authorization
    if (!auth) {
        return reply.code(401).send({ 
            ok: false,
            code: 401,
            error: {
                type: "AUTH_INVALID_CREDENTIALS",
                message: "Missing Token"
            }
        })
    }
    const tokenArray = auth.split(" ");
    if(tokenArray[0] != "Bearer"){
        return reply.send({
            ok: false,
            code: 401,
            error: {
                type: "AUTH_INVALID_CREDENTIALS",
                message: "Invalid Format"
            }
        })
    }
    const token = tokenArray[1];
    const payload = <JWTPayload>jwt.verify(token, JWT_SECRET_KEY||"");
    request.user = payload;
  })
})