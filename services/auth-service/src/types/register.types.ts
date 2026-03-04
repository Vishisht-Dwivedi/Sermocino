import { RouteGenericInterface } from "fastify";
import { ServiceResponse } from "./global.types.js";

export interface RegisterRequest extends RouteGenericInterface {
  Body: {
    email: string;
    username: string;
    password: string;
  };
}
export type RegisterUserObject = {
    id: string,
    email: string,
    username: string,
    passHash: string,
    emailVerified: boolean
}
export interface RegisterResponseData {
  username: string
  email: string
}
export type RegisterServiceResponse = ServiceResponse<RegisterResponseData>