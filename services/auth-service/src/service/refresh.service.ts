import prisma from "../lib/prisma.js";
import { RefreshServiceResponse } from "../types/refresh.types.js";
import * as crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { MetaData } from "../types/global.types.js";

export default async function refreshUser(
  refreshToken: string | undefined,
  meta: MetaData
): Promise<RefreshServiceResponse> {
  try {
    if(!refreshToken || refreshToken.length !== 128) {
      return {
        ok: false,
        code: 422,
        error: {
          type: "UNPROCESSABLE_INPUT",
          message: "Invalid Cookie"
        }
      };
    }
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const existingRefresh = await prisma.refreshToken.findUnique({
      where: { tokenHash: refreshTokenHash }
    });
    if(!existingRefresh) {
      return {
        ok: false,
        code: 401,
        error: {
          type: "AUTH_INVALID_CREDENTIALS",
          message: "Invalid token"
        }
      };
    }
    const now = new Date();

    if(existingRefresh.revoked) {
      await prisma.$transaction([
        prisma.session.update({
          where: { id: existingRefresh.sessionId },
          data: { revoked: true }
        }),
        prisma.refreshToken.updateMany({
          where: { sessionId: existingRefresh.sessionId },
          data: { revoked: true }
        })
      ]);
      return {
        ok: false,
        code: 401,
        error: {
          type: "AUTH_CREDENTIALS_REVOKED",
          message: "Session revoked due to suspicious activity"
        }
      };
    }

    if(now >= existingRefresh.expiresAt) {
      await prisma.session.update({
        where: { id: existingRefresh.sessionId },
        data: { revoked: true }
      });
      return {
        ok: false,
        code: 401,
        error: {
          type: "AUTH_CREDENTIALS_EXPIRED",
          message: "Session expired, login again"
        }
      };
    }
    const sessionObj = await prisma.session.findUnique({
      where: { id: existingRefresh.sessionId }
    });
    if(!sessionObj || sessionObj.revoked) {
      return {
        ok: false,
        code: 401,
        error: {
          type: "AUTH_SESSION_REVOKED",
          message: "Session revoked"
        }
      };
    }
    //device and ip verification
    const fingerprint = crypto
      .createHash("sha256")
      .update(
        (meta.user_agent.ua || "") +
        (meta.os || "") +
        (meta.browser || "")
      )
      .digest("hex");
    //calculating risk
    let risk = 0;
    if (fingerprint != sessionObj.fingerprint) risk += 50;
    if (sessionObj.ip != meta.ip) risk += 20;
    if (sessionObj.device != meta.device) risk += 40;
    if (risk >= 70) {
      await prisma.session.update({
        where: { id: existingRefresh.sessionId },
        data: { revoked: true }
      });
      return {
        ok: false,
        code: 401,
        error: {
          type: "AUTH_SESSION_REVOKED",
          message: "Session revoked"
        }
      };
    }
    if (risk >= 40) {
      console.log("suspicious refresh token for sid: ", sessionObj.id);
    }
    
    const newRefreshToken = crypto.randomBytes(64).toString("hex");
    const newRefreshHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    //dont revoke, keep trail
    const rotated = await prisma.refreshToken.updateMany({
      where: {
        id: existingRefresh.id,
        tokenHash: refreshTokenHash,
        revoked: false
      },
      data: {
        revoked: true
      }
    });
    // check how many it had to mutate..
    // checked for 0 since we are looking for active tokens mutated
    // if none are mutated => old revoked token is being used
    if(rotated.count === 0) {
      await prisma.session.update({
        where: { id: existingRefresh.sessionId },
        data: { revoked: true }
      });
      await prisma.refreshToken.updateMany({
        where: { sessionId: existingRefresh.sessionId },
        data: { revoked: true }
      });
      return {
        ok: false,
        code: 401,
        error: {
          type: "AUTH_CREDENTIALS_REVOKED",
          message: "Refresh token reuse detected"
        }
      };
    }
    await prisma.refreshToken.create({
      data: {
        id: crypto.randomUUID(),
        tokenHash: newRefreshHash,
        createdAt: now,
        expiresAt,
        revoked: false,
        session: {
          connect: { id: existingRefresh.sessionId }
        }
      }
    });
    await prisma.session.update({
      where: { id: sessionObj.id },
      data: { lastUsedAt: now }
    });
    const secret = process.env.JWT_SECRET_KEY;
    if(!secret) {
      throw new Error("JWT_SECRET_KEY missing");
    }
    const payload = {
      sub: sessionObj.userId,
      sid: sessionObj.id
    };
    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "30m",
      issuer: "sermocino-auth",
      audience: "sermocino-api"
    });

    return {
      ok: true,
      code: 200,
      data: {
        accessToken,
        refreshToken: newRefreshToken
      }
    };
  } catch (error) {
    console.error("Refresh error:", error);
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