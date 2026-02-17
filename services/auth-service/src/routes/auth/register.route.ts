import { RouteShorthandOptions, FastifyInstance } from "fastify";
import registerController from "../../controllers/auth/register.controller.js";
import { RegisterRequest } from "../../types/register.types.js";
export const registerSchema: RouteShorthandOptions = {
  schema: {
    tags: ["Auth"],
    summary: "Register a new user",

    body: {
      type: "object",
      required: ["email", "username", "password"],
      properties: {
        email: {
          type: "string",
          format: "email"
        },
        username: {
          type: "string",
          minLength: 3,
          maxLength: 100
        },
        password: {
          type: "string",
          minLength: 6
        }
      }
    },
    response: {
      201: {
        type: "object",
        required: ["status", "data"],
        properties: {
          status: { 
            type: "string",
            enum: ["ok"]
          },
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
      400: {
        type: "object",
        required: ["status", "data"],
        properties: {
          status: { 
            type: "string",
            enum: ["error"]
          },
          data: {
            type: "object",
            required: ["type", "caused_by"],
            properties: {
              type: { type: "string" },
              caused_by: { type: "string" }
            }
          }
        }
      },
      409: {
        type: "object",
        required: ["status", "data"],
        properties: {
          status: { 
            type: "string",
            enum: ["error"]
          },
          data: {
            type: "object",
            required: ["type", "field"],
            properties: {
              type: { type: "string", enum: ["duplicate"] },
              field: { type: "string", enum: ["email", "username"] }
            }
          }
        }
      },
      500: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["error"]
          },
          body: {
            type: "object",
            properties: {
              message: { type:"string" }
            }
          }
        }
      }
    }
  }
};

export default async function registerRoute(fastify: FastifyInstance) {
  fastify.post<RegisterRequest>(
    "/register",
    registerSchema,
    registerController
  );
}
