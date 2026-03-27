import { FastifyInstance } from "fastify";
import { verifyOTPSchema } from "../../schema/verifyOTP.schema.js";
import { VerifyOTPRequest } from "../../types/verifyOTP.types.js";
import verifyOTPController from "../../controllers/otp/verifyOTP.controller.js";

export default async function verifyOTPRoute(fastify: FastifyInstance) {
  fastify.post<VerifyOTPRequest>(
  "/verify-otp",
  verifyOTPSchema,
  verifyOTPController
);
}
