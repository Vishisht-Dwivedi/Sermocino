import { FastifyRequest } from "fastify/types/request.js"
import * as jwt from "jsonwebtoken";
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
  sub: string
  sid: string
}

export type MetaData = {
  ip: string,
  user_agent: IResult,
  device: string,
  os: string | undefined,
  browser: string | undefined
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