import Fastify, { fastify } from "fastify";
// plugins
import swaggerPlugin from "./plugins/swagger.js";
import authPlugin from "./plugins/auth.plugin.js";
import cors from "@fastify/cors"

//routes
import pingRoute from "./routes/ping.route.js";
import registerRoute from "./routes/auth/register.route.js";
import loginRoute from "./routes/auth/login.route.js";
import fastifyCookie from "@fastify/cookie";
import refreshRoute from "./routes/auth/refresh.route.js";
import logoutRoute from "./routes/auth/logout.route.js";

const app = Fastify({
  logger: true,
  //sets proxy ips to trust, stores actual ip instead of container ip
  trustProxy: true
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
await app.register(authPlugin);
await app.register(swaggerPlugin, { prefix: "/api/auth" });
//routes
await app.register(pingRoute, { prefix: "/api/auth" });
await app.register(registerRoute, { prefix: "/api/auth" });
await app.register(loginRoute, { prefix: "/api/auth" });
await app.register(refreshRoute, { prefix: "/api/auth" });
await app.register(logoutRoute, { prefix: "/api/auth" });
console.log(app.printRoutes());
await app.listen({
  port: 3000,
  host: "0.0.0.0"
});
