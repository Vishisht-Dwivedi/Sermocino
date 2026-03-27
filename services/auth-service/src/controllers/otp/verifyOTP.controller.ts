import { FastifyReply, FastifyRequest } from "fastify"
import { LoginRequest } from "../../types/login.types.js"
import loginUser from "../../service/login.service.js"
import { LoginSchema } from "@sermocino/shared";
import { UAParser } from 'ua-parser-js';
import verifyOTP from "../../service/verifyOTP.service.js";
import { VerifyOTPRequest, VerifyOTPServiceResponse } from "../../types/verifyOTP.types.js";

export default async function verifyOTPController(
  request: FastifyRequest<VerifyOTPRequest>,
  reply: FastifyReply
){
    const body = request.body;
    const result = await verifyOTP(body);
    return reply.code(result.code).send(result);
}