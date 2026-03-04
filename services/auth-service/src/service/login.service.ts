import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { LoginServiceResponse, LoginUserPayload } from "../types/login.types.js"

//imp: prevents timing attacks.. 
// use a precomp hash to simulate computation and prevent hackers 
// from knowing if their password is wrong
// always compare ur hash
const FAKE_HASH = "$2b$12$KbQiH5pT3s3v5jXHh2gF9eC9p4mM4XkC9zJzXyK5Y8eV9W3Zz0k5K"

export default async function loginUser(body: {
  email: string
  password: string
}): Promise<LoginServiceResponse> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    })

    const hashToCompare = existingUser?.passHash ?? FAKE_HASH;
    const passValid = await bcrypt.compare(body.password, hashToCompare);

    if (!existingUser || !passValid) {
      const returnObj: LoginServiceResponse = {
        ok: false,
        code: 401,
        error: {
          type: "AUTH_INVALID_CREDENTIALS",
          message: "Invalid email or password"
        }
      }
      return returnObj;
    }

    const payload: LoginUserPayload = {
      userId: existingUser.id
    }
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "15m" }
    )

    const returnObj: LoginServiceResponse = {
      ok: true,
      code: 200,
      data: {
        token
      }
    }
    return returnObj;
  } catch (error) {
    console.error("Login error:", error)
    const returnObj: LoginServiceResponse = {
      ok: false,
      code: 500,
      error: {
        type: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    }
    return returnObj;
  }
}