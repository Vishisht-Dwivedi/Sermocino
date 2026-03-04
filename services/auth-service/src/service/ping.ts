import prisma from "../lib/prisma.js";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async function ping() {
  try {
    await prisma.user.count();
    if(!JWT_SECRET_KEY) throw new Error("Environment variables not loaded");
    
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
