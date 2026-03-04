import { RouteGenericInterface } from "fastify";
import * as jwt from "jsonwebtoken";
import { ServiceResponse } from "./global.types.js";

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
  token: string
}
export type LoginServiceResponse = ServiceResponse<LoginResponseData>

export interface LoginUserPayload extends jwt.JwtPayload {
  userId: string;
}