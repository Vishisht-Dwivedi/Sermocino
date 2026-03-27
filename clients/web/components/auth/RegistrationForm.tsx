"use client"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { toast } from "sonner"
import { registerUser, sendOtp, verifyOtp } from "@/lib/api/auth"

export default function RegistrationForm() {
  const [step, setStep] = useState<"form" | "otp">("form");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [verificationToken, setVerificationToken] = useState("");

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await sendOtp({ email });

    if (res.ok) {
      toast("OTP sent to your email");
      setStep("otp");
    } else {
      toast.error(res.error?.message);
    }
  };

  // Handle OTP input
  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }
    const res = await verifyOtp({ email, otp: enteredOtp });
    if (res.ok) {
      toast("OTP verified");
      setVerificationToken(res.data?.verification_token || "");
    } else {
      toast.error(res.error?.message);
    }
  };

  // Final registration
  const handleRegister = async () => {
    if (!verificationToken) {
      toast.error("Please verify OTP first");
      return;
    }
    const res = await registerUser({
      email,
      password,
      verification_token: verificationToken,
    });

    if (res.ok) {
      toast("Registration Successful", {
        description: JSON.stringify(res.data),
      });
    } else {
      toast.error(res.error?.message);
    }
  };

  return (
    <Card className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-white/30 p-8 shadow-emerald-50 backdrop-blur-xs">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-emerald-900">
          Create Account
        </CardTitle>
        <CardDescription className="mb-6 text-sm text-emerald-900/60">
          Join Sermocino today
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "form" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <Button className="w-full rounded-lg bg-emerald-600 py-5 font-semibold text-white shadow-lg transition hover:bg-emerald-700">
              Verify Email
            </Button>
          </form>
        )}

        {step === "otp" && (
          <div className="space-y-6">
            {/* OTP Boxes */}
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    (inputsRef.current[index] = el)
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className="w-12 h-12 text-center text-lg rounded-lg border border-emerald-900/40 bg-white/60 outline-none focus:ring-2 focus:ring-emerald-400"
                />
              ))}
            </div>

            <Button
              onClick={handleVerifyOtp}
              className="w-full rounded-lg bg-emerald-600 py-5 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
            >
              Verify OTP
            </Button>

            <Button
              onClick={handleRegister}
              className="w-full rounded-lg bg-emerald-600 py-5 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
            >
              Complete Registration
            </Button>
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-6 text-center text-sm text-emerald-900/70">
        Already have an account?{" "}
        <span className="cursor-pointer font-semibold"> Login</span>
      </CardFooter>
    </Card>
  )
}