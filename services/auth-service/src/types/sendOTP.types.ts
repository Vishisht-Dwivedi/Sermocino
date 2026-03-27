import { RouteGenericInterface } from "fastify";
import { ServiceResponse } from "./global.types.js";

export interface SendOTPRequest extends RouteGenericInterface {
    Body: {
        email: string
    }
}

export type SendOTPObject = {
    email: string
}

export type SendOTPServiceResponse = ServiceResponse;
