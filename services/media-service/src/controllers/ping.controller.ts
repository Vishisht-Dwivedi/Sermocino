import { FastifyReply, FastifyRequest } from "fastify";
import pingService from "../services/ping.service.js";
export default async function pingController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const res = await pingService();
    if (res.status == "ok") {
        return {
            pong: "All connections functional!"
        }
    } else {
        // console.log("Error in media-service ping route: ", res.error);
        return {
            pong: "Unhealthy, check logs"
        }
    }
}