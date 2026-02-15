import { FastifyReply, FastifyRequest } from "fastify";
import ping from "../../service/ping.js";
export default async function pingController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const data = await ping();
  if(data.status=="ok"){
    return {
      pong: "All connections functional!"
    }
  } else {
    console.log("Error in auth-service ping route: ",data.error);
    return {
      pong: "Unhealthy, check logs"
    }
  }
}
