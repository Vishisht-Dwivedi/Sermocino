import Fastify from "fastify";
// plugins
import swaggerPlugin from "./plugins/swagger.js";
//routes
import pingRoute from "./routes/ping.route.js";

const app = Fastify({
  logger: true
});
//plugins
await app.register(swaggerPlugin);
//routes
await app.register(pingRoute);

await app.listen({
  port: 3000,
  host: "0.0.0.0"
});
