import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "node:crypto"
import {
  LoginServiceResponse
} from "../types/login.types.js"
import { pass_regex, email_regex } from "../shared/regex.js"
import { JWTPayload } from "../types/global.types.js"
const FAKE_HASH = "$2b$12$KbQiH5pT3s3v5jXHh2gF9eC9p4mM4XkC9zJzXyK5Y8eV9W3Zz0k5K"

export default async function loginUser(body: {
  email: string
  password: string
}): Promise<LoginServiceResponse> {

  try {
    // Validate input
    if (!email_regex.test(body.email) || !pass_regex.test(body.password)) {
      return {
        ok: false,
        code: 422,
        error: {
          type: "UNPROCESSABLE_INPUT",
          message: "Invalid email or password format"
        }
      }
    }
    const user = await prisma.user.findUnique({
      where: { email: body.email }
    })
    const hash = user?.passHash ?? FAKE_HASH
    const valid = await bcrypt.compare(body.password, hash)
    if (!user || !valid) {
      return {
        ok: false,
        code: 401,
        error: {
          type: "AUTH_INVALID_CREDENTIALS",
          message: "Invalid email or password"
        }
      }
    }
    const sessionId = crypto.randomUUID();

    const payload: JWTPayload = {
      sub: user.id,
      sid: sessionId
    }

    const secret = process.env.JWT_SECRET_KEY
    if (!secret) throw new Error("JWT_SECRET_KEY missing");

    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "15m",
      issuer: "sermocino-auth",
      audience: "sermocino-api"
    });

    const refreshToken = crypto.randomBytes(64).toString("hex")
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const now = new Date;
    const expiresAt = new Date(Date.now() + 7*24*60*60*1000);

    await prisma.$transaction(async (tx) => {
      await tx.session.create({
        data: {
          id: sessionId,
          user: {
            connect: { id: user.id }
          },
          createdAt: now,
          lastUsedAt: now,
          revoked: false
        }
      })
      await tx.refreshToken.create({
        data: {
          id: crypto.randomUUID(),
          tokenHash: refreshTokenHash,
          createdAt: now,
          expiresAt,
          revoked: false,
          session: {
            connect: { id: sessionId }
          }
        }
      })
    });
    return {
      ok: true,
      code: 200,
      data: {
        accessToken,
        refreshToken
      }
    }

  } catch (error) {
    console.error("Login error:", error)
    return {
      ok: false,
      code: 500,
      error: {
        type: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    }
  }
}