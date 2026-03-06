import { RouteShorthandOptions } from "fastify";

export const logoutSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Logout existing session",
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
      401: {
        type: "object",
        required: ["ok", "code", "error"],
        properties: {
          ok: { type: "boolean", const: false },
          code: { type: "number", const: 500 },
          error: {
            type: "object",
            required: ["type", "message"],
            properties: {
              type: { type: "string", enum: ["AUTH_INVALID_CREDENTIALS"] },
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