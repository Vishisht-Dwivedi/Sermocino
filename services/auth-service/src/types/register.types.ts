import { RouteGenericInterface } from "fastify"
import { ServiceResponse } from "./global.types.js"
import { RegisterInput } from "@sermocino/shared"

export interface RegisterRequest extends RouteGenericInterface {
  Body: RegisterInput
}

export type RegisterUserObject = {
  id: string
  email: string
  username: string
  passHash: string
  emailVerified: boolean
}

export interface RegisterResponseData {
  username: string
  email: string
}

export type RegisterServiceResponse = ServiceResponse<RegisterResponseData>