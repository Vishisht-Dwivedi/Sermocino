import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import swaggerPlugin from "./plugins/swagger.js";

const server: FastifyInstance = Fastify({});

await server.register(swaggerPlugin);


const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}
server.get("/ping", {
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
}, async () => {
  return { pong: "it worked!" }
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()