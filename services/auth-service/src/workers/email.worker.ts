import { Worker } from "bullmq";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

new Worker(
  "email-queue",
  async (job) => {
    try {
      const { email, otp } = job.data;
      console.log("Processing job:", job.name, job.data);
      await transporter.sendMail({
        from: `"Sermocino" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #059669;">Sermocino Verification</h2>
            <p>Your OTP code is:</p>
            <h1 style="letter-spacing: 5px;">${otp}</h1>
            <p>This OTP will expire in 5 minutes.</p>
          </div>
        `
      });
      console.log(`OTP sent to ${email}`);
    } catch (error) {
      console.error("Email sending failed:", error);
      throw error; //keep.. it lets bullmq retry
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      maxRetriesPerRequest: null,
    },
  }
);