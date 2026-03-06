import { FastifyRequest } from "fastify/types/request.js"
import * as jwt from "jsonwebtoken";

export type ServiceResponse<T = unknown> = {
  ok: boolean
  code: number
  error?: {
    type: string
    message: string
  }
  data?: T
}
export interface JWTPayload extends jwt.JwtPayload {
  sub: string
  sid: string
}
declare module 'fastify' {
  interface FastifyRequest {
    user?: JWTPayload
    signedCookies: Record<string, string | undefined>;
  }
  interface FastifyInstance {
    authenticate(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void>;
  }
}