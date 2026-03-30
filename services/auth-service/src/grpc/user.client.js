import grpc from "@grpc/grpc-js";
import { loadProto } from "@sermocino/grpc-contracts";

const grpcObject = loadProto("user.proto");
const UserService = grpcObject.user.UserService;

const client = new UserService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

export function createUser(data) {
  return new Promise((resolve, reject) => {
    client.CreateUser(data, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}