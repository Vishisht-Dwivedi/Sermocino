import { ServiceResponse } from "@sermocino/shared"

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<ServiceResponse<T>> {
  const res = await fetch(url, {
    // credentials: "include",
    ...options
  })

    return res.json();
}