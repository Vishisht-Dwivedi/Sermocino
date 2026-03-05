import Fastify from "fastify";
// plugins
import swaggerPlugin from "./plugins/swagger.js";
//routes
import pingRoute from "./routes/ping.route.js";
import registerRoute from "./routes/auth/register.route.js";
import loginRoute from "./routes/auth/login.route.js";
import fastifyCookie from "@fastify/cookie";
import refreshRoute from "./routes/auth/refresh.route.js";
import logoutRoute from "./routes/auth/logout.route.js";

const app = Fastify({
  logger: true
});
//plugins
await app.register(fastifyCookie,{
  secret: process.env.COOKIE_SECRET
});
await app.register(swaggerPlugin);
//routes
await app.register(pingRoute);
await app.register(registerRoute, {prefix: "/auth"});
await app.register(loginRoute, {prefix: "/auth"});
await app.register(refreshRoute, {prefix: "/auth"});
await app.register(logoutRoute, {prefix: "/auth"});

await app.listen({
  port: 3000,
  host: "0.0.0.0"
});
