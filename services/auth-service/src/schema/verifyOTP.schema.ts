import { RouteShorthandOptions } from "fastify";

export const verifyOTPSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Verify"],
    summary: "Verifies and validates OTP",
    body: {
        type: "object",
        required: ["email", "otp"],
        properties: {
          email: { type: "string", format: "email" },
          otp: {type: "string"}
        }
    },
    response: {
        200: {
            type: "object",
            required: ["ok", "code", "data"],
            properties: {
                ok: { type: "boolean", const: true },
                code: { type: "number", const: 200 },
                data: {
                    type: "object",
                    required: ["verification_token"],
                    properties: {
                        verification_token: { type: "string" }
                    }
                }
            }
        },
        422: {
            type: "object",
            required: ["ok", "code", "error"],
            properties: {
                ok: { type: "boolean", const: false },
                code: { type: "number", const: 422 },
                error: {
                    type: "object",
                    required: ["type", "message"],
                    properties: {
                        type: { type: "string", enum: ["UNPROCESSABLE_INPUT"] },
                        message: { type: "string" }
                    }
                }
            }
        },
        409: {
            type: "object",
            required: ["ok", "code", "error"],
            properties: {
                ok: { type: "boolean", const: false },
                code: { type: "number", const: 409 },
                error: {
                    type: "object",
                    required: ["type", "message"],
                    properties: {
                        type: { type: "string", enum: ["OTP_EXPIRED"] },
                        message: { type: "string" }
                    } 
                }
            }
        },
        500: {
            type: "object",
            required: ["ok", "code", "error"],
            properties: {
                ok: { type: "boolean", const: false },
                code: { type: "number", const: 500 },
                error: {
                    type: "object",
                    required: ["type", "message"],
                    properties: {
                        type: { type: "string", enum: ["INTERNAL_SERVER_ERROR"] },
                        message: { type: "string" }
                    }
                }
            }
        }
    }
  }
};