import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"
import crypto from "node:crypto"
import { LogoutServiceResponse } from "../types/logout.types.js"
import { JWTPayload } from "../types/global.types.js"
import { Prisma } from "@prisma/client/extension"


export default async function logoutUser(
    userObject: JWTPayload|undefined,
    refreshToken: string
): Promise<LogoutServiceResponse> {
  try { 
    if(!userObject || refreshToken.length != 128){
        return {
            ok: true,
            code: 200,
            data: {
                message: "Logout Successful"
            }
        }
    }
    const {sub, sid} = userObject;
    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex")
    await prisma.$transaction(async (tx:Prisma.TransactionClient)=>{
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