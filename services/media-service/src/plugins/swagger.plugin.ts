import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export default fp(async function (app) {

  await app.register(swagger, {
    openapi: {
      info: {
        title: "Sermocino Media Uploads Endpoint",
        description: "Upload service for Sermocino",
        version: "1.0.0"
      },
      servers: [
        { url: "http://localhost:3004" }
      ]
    }
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false
    }
  });

});
