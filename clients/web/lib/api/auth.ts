import { apiFetch } from "./helper";
import {
  LoginInput,
  LoginSchema,
  RegisterInput,
  RegisterSchema,
  ServiceResponse
} from "@sermocino/shared";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost";

// register helper
export const registerUser = async (
  data: RegisterInput
): Promise<ServiceResponse<{ email: string }>> => {
  const parsed = RegisterSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      code: 400,
      error: {
        type: "VALIDATION_ERROR",
        message: parsed.error.issues[0].message
      }
    };
  }

  return apiFetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parsed.data)
  });
};

// login helper
export const loginUser = async (
  data: LoginInput
): Promise<ServiceResponse<any>> => {
  const parsed = LoginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      code: 400,
      error: {
        type: "VALIDATION_ERROR",
        message: parsed.error.issues[0].message
      }
    };
  }

  return apiFetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parsed.data)
  });
};

// send helper
export const sendOtp = async (
  data: { email: string }
): Promise<ServiceResponse<{ message: string }>> => {
  return apiFetch(`${BASE_URL}/api/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

// verification helper
export const verifyOtp = async (
  data: { email: string; otp: string }
): Promise<ServiceResponse<{ verification_token: string }>> => {
  return apiFetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};