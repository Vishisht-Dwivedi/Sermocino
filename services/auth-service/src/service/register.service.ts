import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { Prisma } from "@prisma/client";

export default async function registerUser(body: {
  email: string;
  username: string;
  password: string;
}) {
  try {
    const passHash = await bcrypt.hash(body.password, 12);
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email: body.email,
        username: body.username,
        passHash,
        emailVerified: false
      }
    });
    return {
      status: "ok",
      data: {
        username: user.username,
        email: user.email
      }
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const field = (error.meta?.target as string[])[0];
      return {
        status: "error",
        code: "conflict",
        field
      };
    }
    return {
      status: "error",
      code: "unknown"
    };
  }
}
