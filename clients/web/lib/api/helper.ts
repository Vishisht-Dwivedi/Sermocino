import { ServiceResponse } from "@sermocino/shared"
import { useAuthStore } from "@/stores/auth.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost";

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<ServiceResponse<T>> {
  let accessToken = useAuthStore.getState().accessToken;
  const makeRequest = async () => {
    return fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...(options?.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : ""
      }
    });
  };
  let res = await makeRequest();
  if (res.status === 401) {
    const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include"
    });
    if (refreshRes.status !== 200) {
      window.location.href = "/auth/login";
      useAuthStore.getState().clearAuthState();
      throw new Error("Unauthorized");
    }
    const data = await refreshRes.json();

    useAuthStore.getState().setAuthState({
      accessToken: data.accessToken
    });

    accessToken = data.accessToken;
    res = await makeRequest();
  }

  return res.json();
}