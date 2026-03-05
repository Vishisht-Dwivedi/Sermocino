import { RouteGenericInterface } from "fastify";
import { ServiceResponse } from "./global.types.js";

export interface RefreshRequest extends RouteGenericInterface {
  Body: null
}
export interface RefreshServiceData {
  accessToken: string,
  refreshToken: string
}
export type RefreshServiceResponse = ServiceResponse<RefreshServiceData>