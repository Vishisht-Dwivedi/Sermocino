import prisma from "../lib/prisma.js";

export default async function ping() {
  try {
    await prisma.user.count();

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
