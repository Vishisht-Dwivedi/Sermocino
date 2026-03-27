import emailEnqueue from "../notifications/sendEmail.notification.js";
import { email_regex } from "../shared/regex.js";
import { SendOTPServiceResponse } from "../types/sendOTP.types.js";
import crypto from "node:crypto";
import redis from "../lib/redis.js";

export default async function sendOTP(body: {
    email: string
}): Promise<SendOTPServiceResponse> {
    try {
        if (!body.email || !email_regex.test(body.email)) {
            return {
                ok: false,
                code: 422,
                error: {
                    type: "UNPROCESSABLE_INPUT",
                   message: "Entered Credentials are not in accordance to the guidelines"
                }
            }
        }
        const otp = crypto.randomInt(100000, 999999);
        await emailEnqueue(body.email, otp);
        const hashedOtp = crypto
            .createHash("sha256")
            .update(otp.toString())
            .digest("hex");
        await redis.setex(`otp:${body.email}`, 300, hashedOtp);
        const key = `otp:rate:${body.email}`;
        const count = await redis.incr(key);
        if (count === 1) {
            await redis.expire(key, 60);
        }
        if (count > 3) {
          return {
            ok: false,
            code: 429,
            error: {
              type: "RATE_LIMITED",
              message: "Too many OTP requests"
            }
          };
        }
        return {
            ok: true,
            code: 200
        }
    } catch (error) {
        console.log("SendOTP Error: ", error);
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