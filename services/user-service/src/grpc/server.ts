import * as grpc from "@grpc/grpc-js";
import {
  UserServiceService,
  UserServiceServer
} from "@sermocino/grpc-contracts";
import prisma from "../lib/prisma.js";

const impl: UserServiceServer = {
  async createProfile(call, callback) {
    const { userId, email } = call.request;
    let user;
    console.log("Incoming request:", call.request);
    try {
      const res = await prisma.profile.create({
        data: {
          id: userId,
          isOnboarded: false
        }
      });
      console.log(res);
      user = {
        success: true
      }; 
    } catch (error) {
      console.log("User Service Error (grpc): ", error);
      user = {
        success: false
      }
    }
    callback(null, user);
  }
};

const server = new grpc.Server();

server.addService(UserServiceService, impl);

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("User gRPC running");
  }
);