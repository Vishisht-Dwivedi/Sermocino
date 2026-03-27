import { emailQueue } from "../lib/queue.js";

export default async function emailEnqueue(email:string, otp: number) {
    await emailQueue.add("send-otp", {
        email: email,
        otp: otp,
    });    
}
