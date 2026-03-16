import { RouteGenericInterface } from "fastify";
import { ServiceResponse } from "./global.types.js";
import { LoginInput } from "@sermocino/shared";

export interface LoginRequest extends RouteGenericInterface {
  Body: LoginInput
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
