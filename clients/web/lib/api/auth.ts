import { apiFetch } from "./helper"
import { LoginInput, LoginSchema, RegisterInput, RegisterSchema, ServiceResponse } from "@sermocino/shared"

export const registerUser = (data: RegisterInput) => {
    const parsed = RegisterSchema.safeParse(data);
    if(parsed.success){
        return apiFetch("http://localhost/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });    
    } else {
        return <ServiceResponse>{
            ok: false,
            code: 400,
            error: {
                type: "VALIDATION_ERROR",
                message: `Cause: ${parsed.error.issues[0].path}, Error: ${parsed.error.issues[0].message}`
            }
        }
    }
}

export const loginUser = (data: LoginInput) => {
    const parsed = LoginSchema.safeParse(data);
    if (parsed.success) {
        return apiFetch("http://localhost/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    } else {
        return <ServiceResponse>{
            ok: false,
            code: 400,
            error: {
                type: "VALIDATION_ERROR",
                message: `Cause: ${parsed.error.issues[0].path}, Error: ${parsed.error.issues[0].message}`
            }
        }
    }
}