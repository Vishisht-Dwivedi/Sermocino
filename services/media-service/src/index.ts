import Fastify, { fastify } from "fastify";
// plugins
import swaggerPlugin from "./plugins/swagger.plugin.js";
import authPlugin from "./plugins/auth.plugin.js";
import cors from "@fastify/cors"
import multipart from "@fastify/multipart";


//routes
import pingRoute from "./routes/ping.route.js";
import fastifyCookie from "@fastify/cookie";
import imageRoute from "./routes/upload/image.route.js";

const app = Fastify({
  logger: true,
  //sets proxy ips to trust, stores actual ip instead of container ip
  trustProxy: true
});
//plugins
await app.register(cors, {
   origin: [
    "http://localhost:3000",
    "http://localhost",
    "http://192.168.29.50",
    "http://192.168.29.60"
  ],
  credentials: true
})
await app.register(fastifyCookie,{
  secret: process.env.COOKIE_SECRET
});
await app.register(swaggerPlugin);
await app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});
await app.register(authPlugin);
//routes
await app.register(pingRoute);
await app.register(imageRoute);

console.log(app.printRoutes());
await app.listen({
  port: Number(process.env.PORT)||3004,
  host: "0.0.0.0"
});
