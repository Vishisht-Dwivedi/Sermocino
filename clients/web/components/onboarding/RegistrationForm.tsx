"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = username.trim() && displayName.trim();

  const submitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log(e);
    if (!isValid) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);

      // TODO: call your API here
      await new Promise((res) => setTimeout(res, 800)); // mock delay

      toast.success("Registration completed!");

      console.log({
        username,
        displayName,
        bio,
      });
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-white/30 p-8 shadow-emerald-50 backdrop-blur-xs">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-emerald-900">
          Complete Your Profile
        </CardTitle>
        <CardDescription className="mb-4 text-sm text-emerald-900/75">
          Just a few more details to get you started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={submitHandler}>
          <ImageUpload />
          <div className="space-y-1">
            <label className="px-0.5 text-sm font-medium text-emerald-900">
              Username *
            </label>
            <Input
              type="text"
              placeholder="e.g. spectre_dev"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="space-y-1">
            <label className="px-0.5 text-sm font-medium text-emerald-900">
              Display Name *
            </label>
            <Input
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="space-y-1">
            <label className="px-0.5 text-sm font-medium text-emerald-900">
              Bio
            </label>
            <Input
              type="text"
              placeholder="Tell us something about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <Button
            type="submit"
            disabled={!isValid || loading}
            className="w-full rounded-lg bg-emerald-600 py-5 font-semibold text-white shadow-md transition-all hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Setting things up..." : "Complete Registration"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="mt-4 text-center text-sm text-emerald-900/70">
        Already onboarded?{" "}
        <span className="cursor-pointer font-semibold text-emerald-700 hover:underline">
          Go to dashboard
        </span>
      </CardFooter>
    </Card>
  );
}