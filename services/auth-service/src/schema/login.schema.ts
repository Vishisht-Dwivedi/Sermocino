import { RouteShorthandOptions } from "fastify";

export const loginSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Login existing user",

    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 }
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
              type: { type: "string", enum: ["AUTH_INVALID_CREDENTIALS"] },
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