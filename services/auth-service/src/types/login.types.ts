import { RouteGenericInterface } from "fastify";

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
export interface LoginServiceResponse {
    status: string,
    body: {
        username: string,
        email: string,
        message?: string
    }
}