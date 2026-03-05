import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"
import crypto from "node:crypto"
import { LogoutServiceResponse } from "../types/logout.types.js"
import { LoginUserPayload } from "../types/login.types.js"


export default async function logoutUser(
    accessToken: string,
    refreshToken: string
): Promise<LogoutServiceResponse> {
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if(!JWT_SECRET_KEY) {
        throw new Error("Environment variable not recieved");
    }
    const decodedPayload = <LoginUserPayload>jwt.verify(accessToken,JWT_SECRET_KEY);
    if(!decodedPayload || refreshToken.length != 128){
        return {
            ok: true,
            code: 200,
            data: {
                message: "Logout Successful"
            }
        }
    }
    const {sub, sid} = decodedPayload;
    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex")
    await prisma.$transaction(async (tx)=>{
        await tx.session.updateMany({
            where: {
                id: sid
            },
            data: {
                revoked: true
            }
        });
        await tx.refreshToken.updateMany({
            where: {
                tokenHash: refreshTokenHash
            },
            data: {
                revoked: true
            }
        })
    });
    return {
        ok: true,
        code: 200,
        data: {
            message: "Logout Sucessful"
        }
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
        return {
            ok: true,
            code: 200,
            data: {
                message: "Logout Successful"
            }
        } 
    }
    console.error("Logout error:", error);
    return {
        ok: false,
        code: 500,
        error: {
            type: "INTERNAL_SERVER_ERROR",
            message: "Internal Server Error"
        }
    }
  }
}