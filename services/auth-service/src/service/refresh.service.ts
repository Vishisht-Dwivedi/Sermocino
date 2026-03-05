import prisma from "../lib/prisma.js";
import { RefreshServiceResponse } from "../types/refresh.types.js";
import * as crypto from "node:crypto";
import jwt from "jsonwebtoken";

export default async function refreshUser(refreshToken: string|undefined): Promise<RefreshServiceResponse> {
    try {
        // early exit
        if(!refreshToken || refreshToken.length != 128){
            return {
                ok: false,
                code: 422,
                error: {
                    type: "UNPROCESSABLE_INPUT",
                    message: "Invalid Cookie"
                }
            }
        }
        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        // lookup refresh token
        const existingRefresh = await prisma.refreshToken.findUnique({
            where: {
                tokenHash: refreshTokenHash
            }
        });

        if (!existingRefresh) {
            return {
                ok: false,
                code: 401,
                error: {
                    type: "AUTH_INVALID_CREDENTIALS",
                    message: "Invalid token"
                }
            }
        }
        // token revoked
        if (existingRefresh.revoked) {
            await prisma.$transaction(async (tx) => {
                await tx.refreshToken.delete({
                    where: { id: existingRefresh.id }
                });
                await tx.session.delete({
                    where: { id: existingRefresh.sessionId }
                });
            });
            return {
                ok: false,
                code: 401,
                error: {
                    type: "AUTH_CREDENTIALS_REVOKED",
                    message: "Due to suspicious activity, your session was revoked, login again"
                }
            }
        }
        const now = new Date();
        // token expired
        if (now.getTime() - existingRefresh.expiresAt.getTime() >= 0) {
            await prisma.$transaction(async (tx) => {
                await tx.refreshToken.delete({
                    where: { id: existingRefresh.id }
                });
                await tx.session.delete({
                    where: { id: existingRefresh.sessionId }
                });
            });
            return {
                ok: false,
                code: 401,
                error: {
                    type: "AUTH_CREDENTIALS_EXPIRED",
                    message: "Session expired, please login again"
                }
            }
        }
        // load session
        const sessionObj = await prisma.session.findUnique({
            where: {
                id: existingRefresh.sessionId
            }
        });

        if(!sessionObj || sessionObj.revoked){
            return {
                ok: false,
                code: 401,
                error: {
                    type: "AUTH_SESSION_REVOKED",
                    message: "Session revoked, please login again"
                }
            }
        }
        // generate new refresh token
        const newRefreshToken = crypto.randomBytes(64).toString("hex");
        const newRefreshHash = crypto
            .createHash("sha256")
            .update(newRefreshToken)
            .digest("hex");

        const expiresAt = new Date(Date.now() + 7*24*60*60*1000);

        // rotate refresh token
        await prisma.refreshToken.update({
            where: { id: existingRefresh.id },
            data: {
                tokenHash: newRefreshHash,
                createdAt: now,
                expiresAt,
                revoked: false
            }
        });

        // update session activity
        await prisma.session.update({
            where: { id: sessionObj.id },
            data: {
                lastUsedAt: now
            }
        });

        // create new access token
        const payload = {
            sub: sessionObj.userId,
            sid: sessionObj.id
        };

        const secret = process.env.JWT_SECRET_KEY;

        if (!secret) {
            throw new Error("JWT_SECRET_KEY missing");
        }

        const accessToken = jwt.sign(payload, secret, {
            expiresIn: "15m",
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
        }
    } catch (error) {
        console.error("Refresh error:", error);
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