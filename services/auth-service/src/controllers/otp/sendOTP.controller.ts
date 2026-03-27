import { FastifyReply, FastifyRequest } from "fastify"
import { SendOTPRequest } from "../../types/sendOTP.types.js"
import sendOTP from "../../service/sendOTP.service.js"
import { SendOTPSchema } from "@sermocino/shared"

export default async function sendOTPController(
  request: FastifyRequest<SendOTPRequest>,
  reply: FastifyReply
) {
    const result = await sendOTP(request.body);
    return reply
        .code(result.code)
        .send(result)
}