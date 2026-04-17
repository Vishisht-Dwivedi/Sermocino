import { create } from "zustand"

export interface useAuthStoreTypes {
    email: string,
    accessToken: string,
    setAuthState: Function,
    clearAuthState: Function
}
export const useAuthStore = create<useAuthStoreTypes>((set) => ({
    email: "",
    accessToken: "",
    setAuthState: (data: useAuthStoreTypes) => set(data),
    clearAuthState: () => set({
        email: "",
        accessToken: ""
    })
}))