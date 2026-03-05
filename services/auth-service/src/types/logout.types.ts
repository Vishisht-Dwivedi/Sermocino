import { RouteGenericInterface } from "fastify";
import { ServiceResponse } from "./global.types.js";

export interface LogoutRequest extends RouteGenericInterface {
  Body: null
}
export type LogoutServiceResponse = ServiceResponse;