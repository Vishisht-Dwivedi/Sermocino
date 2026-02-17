import { RouteGenericInterface } from "fastify";

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
export interface RegisterServiceResponse {
    status: string,
    error?: string,
    body?: {
        username: string,
        email: string
    }
}