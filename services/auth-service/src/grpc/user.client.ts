import * as grpc from "@grpc/grpc-js";
import {
  UserServiceClient,
  CreateProfileRequest,
  CreateProfileResponse
} from "@sermocino/grpc-contracts";

const client = new UserServiceClient(
  "0.0.0.0:50051",
  grpc.credentials.createInsecure()
);

export function createProfile(
  data: CreateProfileRequest
): Promise<CreateProfileResponse> {
  return new Promise((resolve, reject) => {
    client.createProfile(
      data,
      (err, res) => {
        if (err) return reject(err);
        resolve(res!);
      }
    );
  });
}