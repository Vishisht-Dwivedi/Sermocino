import * as grpc from "@grpc/grpc-js";
import {
  UserServiceClient,
  CreateUserRequest,
  CreateUserResponse
} from "@sermocino/grpc-contracts";

const client = new UserServiceClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export function createUser(
  data: CreateUserRequest
): Promise<CreateUserResponse> {
  return new Promise((resolve, reject) => {
    client.createUser(
      data,
      (err, res) => {
        if (err) return reject(err);
        resolve(res!);
      }
    );
  });
}