import Fastify from "fastify";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT||3000;
const fastify = Fastify({
    logger: true
});

fastify.get("/health", async ()=>{
    return {ok: "true"}
});


fastify.listen({ port: PORT, host: "0.0.0.0" });