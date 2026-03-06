import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
import crypto from "node:crypto"
import { Prisma } from "@prisma/client"
import { RegisterServiceResponse } from "../types/register.types.js"
import { pass_regex, email_regex } from "../shared/regex.js"
export default async function registerUser(body: {
  email: string
  username: string
  password: string
}): Promise<RegisterServiceResponse> {
  try {
    if (
      !pass_regex.test(body.password) ||
      !email_regex.test(body.email) ||
      body.username.length < 3 ||
      body.username.length > 100
    ){
      return {
        ok: false,
        code: 422,
        error: {
          type: "UNPROCESSABLE_INPUT",
          message: "Entered Credentials are not in accordance to the guidelines"
        }
      }
    }
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
    return <RegisterServiceResponse>{
      ok: true,
      code: 201,
      data: {
        username: user.username,
        email: user.email
      }
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target as string[] | undefined;
      const field = target?.[0] ?? "unknown";
      return <RegisterServiceResponse>{
        ok: false,
        code: 409,
        error: {
          type: "RESOURCE_CONFLICT",
          message: `${field} already exists`
        }
      }
    }
    console.error("Register error:", error);

    return <RegisterServiceResponse>{
      ok: false,
      code: 500,
      error: {
        type: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    }
  }
}