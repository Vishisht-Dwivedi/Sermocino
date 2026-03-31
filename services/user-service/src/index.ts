import Fastify from "fastify";
// plugins
import cors from "@fastify/cors"

//routes
import fastifyCookie from "@fastify/cookie";
import pingRoute from "./routes/ping.route.js";

const app = Fastify({
  logger: true
});
//plugins
await app.register(cors, {
   origin: [
    "http://localhost:3000",
    "http://localhost"
   ],
  credentials: true
})
await app.register(fastifyCookie,{
  secret: process.env.COOKIE_SECRET
});
//routes
await app.register(pingRoute);

await app.listen({
  port: Number(process.env.PORT) || 3003,
  host: "0.0.0.0"
});
