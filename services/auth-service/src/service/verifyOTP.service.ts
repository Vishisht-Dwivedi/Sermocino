import redis from "../lib/redis.js";
import { email_regex } from "../shared/regex.js";
import { VerifyOTPServiceResponse } from "../types/verifyOTP.types.js";
import jwt from "jsonwebtoken"
import crypto from "node:crypto";

export default async function verifyOTP(body: {
    otp: string,
    email: string
}): Promise<VerifyOTPServiceResponse> {
    try {
        if (!body.otp || !body.email || !email_regex.test(body.email) || !/^\d{6}$/.test(body.otp)) {
            return {
                ok: false,
                code: 422,
                error: {
                    type: "UNPROCESSABLE_INPUT",
                    message: "Entered Credentials are not in accordance to the guidelines"
                }
            }
        }
        const storedOtp = await redis.get(`otp:${body.email}`);
        const hashedOtp = crypto
            .createHash("sha256")
            .update(body.otp.toString())
            .digest("hex");
        if (!storedOtp || hashedOtp != storedOtp) {
            return {
                ok: false,
                code: 409,
                error: {
                    type: "OTP_EXPIRED",
                    message: "Provided OTP is incorrect or has expired, try registering again"
                }
            }
        }
        const secret = process.env.JWT_SECRET_KEY
        if (!secret) throw new Error("JWT_SECRET_KEY missing");

        const payload = {
            email: body.email,
            verified: true
        }

        const verification_token = jwt.sign(payload, secret, {
            expiresIn: "15m",
            issuer: "sermocino-auth",
            audience: "sermocino-api"
        });
        await redis.del(`otp:${body.email}`);
        return {
            ok: true,
            code: 200,
            data: {
                verification_token
            }
        }
    } catch (error) {
        console.log("Verify OTP Error: ", error);
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