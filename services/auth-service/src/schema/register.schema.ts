import { RouteShorthandOptions } from "fastify";

export const registerSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Register new user",

    body: {
      type: "object",
      required: ["email", "username", "password"],
      properties: {
        email: { type: "string", format: "email" },
        username: { type: "string", minLength: 3, maxLength: 100 },
        password: { type: "string", minLength: 6 }
      }
    },

    response: {
      201: {
        type: "object",
        required: ["ok", "code", "data"],
        properties: {
          ok: { type: "boolean", const: true },
          code: { type: "number", const: 201 },
          data: {
            type: "object",
            required: ["username", "email"],
            properties: {
              username: { type: "string" },
              email: { type: "string" }
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
              type: { type: "string", enum: ["RESOURCE_CONFLICT"] },
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