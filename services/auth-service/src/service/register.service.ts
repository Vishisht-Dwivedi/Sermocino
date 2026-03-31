import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
import crypto from "node:crypto"
import { Prisma } from "../generated/prisma/index.js"
import { RegisterServiceResponse } from "../types/register.types.js"
import jwt from "jsonwebtoken"
import {createUser} from "../grpc/user.client.js"

export default async function registerUser(body: {
  email: string
  password: string
  verification_token: string
}): Promise<RegisterServiceResponse> {
  try {
    const { email, password, verification_token } = body;

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) throw new Error("JWT_SECRET_KEY missing");

    let decoded: any;
    try {
      decoded = jwt.verify(verification_token, secret, {
        issuer: "sermocino-auth",
        audience: "sermocino-api"
      });
    } catch (err) {
      return {
        ok: false,
        code: 422,
        error: {
          type: "UNPROCESSABLE_INPUT",
          message: "Invalid or expired verification token"
        }
      };
    }
    if (!decoded.verified || decoded.email !== email) {
      return {
        ok: false,
        code: 422,
        error: {
          type: "UNPROCESSABLE_INPUT",
          message: "Verification token does not match email"
        }
      };
    }

    const passHash = await bcrypt.hash(password, 12);
    const user_id = crypto.randomUUID();

    const user = await prisma.user.create({
      data: {
        id: user_id,
        email,
        passHash,
        emailVerified: true
      }
    });
    const res = await createUser({
      authId: user.id,
      email: user.email
    });
    if (!res.success) {
      throw new Error("User service failed");
    }
    return {
      ok: true,
      code: 201,
      data: {
        email: user.email
      }
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target as string[] | undefined;
      const field = target?.[0] ?? "unknown";
      return {
        ok: false,
        code: 409,
        error: {
          type: "RESOURCE_CONFLICT",
          message: `${field} already exists`
        }
      };
    }
    console.error("Register error:", error);
    return {
      ok: false,
      code: 500,
      error: {
        type: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    };
  }
}