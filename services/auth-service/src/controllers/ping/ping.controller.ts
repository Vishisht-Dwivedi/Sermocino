import { FastifyReply, FastifyRequest } from "fastify";
import ping from "../../service/ping.js";
export default async function pingController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const data = await ping();
  if(data.status == "ok") {
    return { 
      pong: "Everything is functional" 
    };  
  } else {
    return {
      pong: "Database is down"
    }
  }
  
}
