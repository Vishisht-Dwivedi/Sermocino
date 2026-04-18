import { FastifyRequest } from "fastify/types/request.js"
import * as jwt from "jsonwebtoken";
import { UUID } from "node:crypto";
import { IResult } from "ua-parser-js";

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
  sub: UUID
  sid: string
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      sub: UUID
    },
    signedCookies: Record<string, string | undefined>;
  }
  interface FastifyInstance {
    authenticate(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void>;
  }
}