import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/global.types.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY not defined");
}

export default fp(async function (fastify) {
  fastify.decorate("authenticate", async function (request, reply) {
    const auth = request.headers.authorization;

    if (!auth) {
      return reply.code(401).send({
        ok: false,
        code: 401,
        error: {
          type: "AUTH_INVALID_CREDENTIALS",
          message: "Missing token"
        }
      });
    }

    const [scheme, token] = auth.split(" ");

    if (scheme !== "Bearer" || !token) {
      return reply.code(401).send({
        ok: false,
        code: 401,
        error: {
          type: "AUTH_INVALID_CREDENTIALS",
          message: "Invalid token format"
        }
      });
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET_KEY) as JWTPayload;
      request.user = payload;
    } catch {
      return reply.code(401).send({
        ok: false,
        code: 401,
        error: {
          type: "AUTH_CREDENTIALS_EXPIRED",
          message: "Invalid or expired token"
        }
      });
    }
  });
});