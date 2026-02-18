import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export default async function loginUser(body: {
  email: string;
  password: string;
}) {
  try {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })
    const fakeHash = await bcrypt.hash("acc_doesn't exist", 12);

    const passValid = await bcrypt.compare(body.password, existingUser?.passHash ?? fakeHash);
    if(!existingUser||!passValid){
        return {
            status: "error",
            code: "invalid",
            data: {
                message: "Invalid Credentials"
            }
        }
    }
    return {
      status: "ok",
      code: "ok",
      data: {
        username: existingUser.username,
        email: existingUser.email
      }
    };
  } catch (error) {
    return {
      status: "error",
      code: "unknown",
      data: {
        error
      }
    };
  }
}
