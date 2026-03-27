import { RouteShorthandOptions } from "fastify";

export const sendOTPSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Send"],
    summary: "Sends otp to provided email address",

    body: {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string", format: "email" }
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
            required: ["message"],
            properties: {
              message: { type: "string" }
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
      429: {
        type: "object",
        required: ["ok", "code", "error"],
        properties: {
          ok: { type: "boolean", const: false },
          code: { type: "number", const: 429 },
          error: {
            type: "object",
            required: ["type", "message"],
            properties: {
              type: { type: "string", enum: ["RATE_LIMITED"] },
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