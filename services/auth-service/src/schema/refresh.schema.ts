import { RouteShorthandOptions } from "fastify";

export const refreshSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Used to refresh and rotate access tokens",
    response: {
      200: {
        type: "object",
        required: ["ok", "code", "data"],
        properties: {
          ok: { type: "boolean", const: true },
          code: { type: "number", const: 200 },
          data: {
            type: "object",
            required: ["accessToken"],
            properties: {
              accessToken: { type: "string" }
            }
          }
        }
      },
      401: {
        type: "object",
        required: ["ok", "code", "error"],
        properties: {
          ok: { type: "boolean", const: false },
          code: { type: "number", const: 401 },
          error: {
            type: "object",
            required: ["type", "message"],
            properties: {
              type: { type: "string", enum: ["AUTH_INVALID_CREDENTIALS", "AUTH_CREDENTIALS_EXPIRED", "AUTH_CREDENTIALS_REVOKED"] },
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