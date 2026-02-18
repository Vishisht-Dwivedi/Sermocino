import { RouteShorthandOptions } from "fastify";

export const loginSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Login for existing user",

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
        required: ["status", "data"],
        properties: {
          status: { type: "string", enum: ["ok"] },
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

      401: {
        type: "object",
        required: ["status", "data"],
        properties: {
          status: { type: "string", enum: ["error"] },
          data: {
            type: "object",
            required: ["type"],
            properties: {
              type: { type: "string", enum: ["invalid_credentials"] },
              message: { type: "string" }
            }
          }
        }
      },

      500: {
        type: "object",
        required: ["status", "data"],
        properties: {
          status: { type: "string", enum: ["error"] },
          data: {
            type: "object",
            required: ["type"],
            properties: {
              type: { type: "string", enum: ["server_error"] },
              message: { type: "string" }
            }
          }
        }
      }
    }
  }
};
