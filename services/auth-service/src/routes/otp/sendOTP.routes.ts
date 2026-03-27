import { FastifyInstance } from "fastify";
import { sendOTPSchema } from "../../schema/sendOTP.schema.js";
import sendOTPController from "../../controllers/otp/sendOTP.controller.js";
import { SendOTPRequest } from "../../types/sendOTP.types.js";

export default async function sendOTPRoute(fastify: FastifyInstance) {
  fastify.post<SendOTPRequest>(
    "/send-otp",
    sendOTPSchema,
    sendOTPController
  );
}
