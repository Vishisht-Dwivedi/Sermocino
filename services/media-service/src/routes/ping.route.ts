import { FastifyInstance } from "fastify";
import pingController from "../controllers/ping.controller.js";

export default async function pingRoute(app: FastifyInstance) {
    app.get("/ping", {
        schema: {
            tags: ["Health"],
            summary: "Health check",
            response: {
                200: {
                    type: "object",
                    properties: {
                        pong: { type: "string" }
                    }
                }
            }
        }
    }, pingController)
}