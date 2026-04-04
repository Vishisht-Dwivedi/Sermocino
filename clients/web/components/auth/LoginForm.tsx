"use client";
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
import { useState } from "react";
import { toast } from "sonner"
import { loginUser } from "@/lib/api/auth";
import { useAuthStore, useAuthStoreTypes } from "@/stores/auth.store";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuthState = useAuthStore(state => state.setAuthState);
  const clearAuthState = useAuthStore(state => state.clearAuthState);
  const submitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const res = await loginUser({
      email,
      password
    });
    if (res.ok) {
      toast("Login Successful");
      setAuthState({
        email,
        accessToken: res.data.accessToken
      });
    } else {
      clearAuthState();
      toast.error(res.error?.message);
    }
  }
  return (
    <Card className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-white/30 p-8 shadow-emerald-50 backdrop-blur-xs">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-emerald-900">
          Welcome Back
        </CardTitle>
        <CardDescription className="mb-6 text-sm text-emerald-900/75">
          Access your Sermocino account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={submitHandler}>
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
          <Button className="w-full rounded-lg bg-emerald-600 py-5 font-semibold text-white shadow-lg transition hover:bg-emerald-700">
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="mt-6 text-center text-sm text-emerald-900/70">
        Don't have an account?{" "}
        <span className="cursor-pointer font-semibold">Register</span>
      </CardFooter>
    </Card>
  )
}
