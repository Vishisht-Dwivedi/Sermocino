import { RouteGenericInterface } from "fastify";
import { ServiceResponse } from "./global.types.js";

export interface VerifyOTPRequest extends RouteGenericInterface {
    Body: {
        email: string
        otp: string
    }
}

export type VerifyOTPObject = {
    email: string,
    otp: number
}
export interface VerifyOTPResponseData {
    verification_token: string
}
export type VerifyOTPServiceResponse = ServiceResponse<VerifyOTPResponseData>;
