import prisma from "../lib/prisma.js";
import redis from "../lib/redis.js";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;
export default async function ping() {
  try {
    await prisma.user.count();
    console.log(JWT_SECRET_KEY, host, port);
    if(!JWT_SECRET_KEY || !host || !port) throw new Error("Environment variables not loaded");
    await redis.set("hello", "world");
    await redis.getdel("hello");
    return {
      status: "ok",
    };
  } catch (err) {
    return {
      status: "error",
      error: err,
    };
  }
}
