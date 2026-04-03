import { Redis } from "ioredis"
const redis = new Redis({
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null
});
redis.on("connect", () => {
    console.log("Auth-service: Redis connection successful");
});
redis.on("error", (e) => {
    console.log("Auth-service: Redis error", e);
});
export default redis;