import { create } from "zustand"

export interface useAuthStoreTypes {
    username: string,
    email: string,
    accessToken: string,
    setAuthState: Function,
    clearAuthState: Function
}
export const useAuthStore = create<useAuthStoreTypes>((set) => ({
    username: "",
    email: "",
    accessToken: "",
    setAuthState: (data: useAuthStoreTypes) => set(data),
    clearAuthState: () => set({
        username: "",
        email: "",
        accessToken: ""
    })
}))