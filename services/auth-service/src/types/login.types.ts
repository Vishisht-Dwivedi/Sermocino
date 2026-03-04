import { RouteGenericInterface } from "fastify";
import * as jwt from "jsonwebtoken";
import { ServiceResponse } from "./global.types.js";
import { Prisma } from "@prisma/client";
export interface LoginRequest extends RouteGenericInterface {
  Body: {
    email: string;
    password: string;
  };
}
export type LoginUserObject = {
    email: string,
    passHash: string
}

export interface LoginResponseData {
  accessToken: string,
  refreshToken: string
}
export type LoginServiceResponse = ServiceResponse<LoginResponseData>

export interface LoginUserPayload extends jwt.JwtPayload {
  sub: string
  sid: string
}