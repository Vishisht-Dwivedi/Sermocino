import { RouteGenericInterface } from "fastify";
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
  accessToken: string,
  refreshToken: string
}
export type LoginServiceResponse = ServiceResponse<LoginResponseData>
