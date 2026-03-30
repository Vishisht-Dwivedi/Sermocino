import grpc from "@grpc/grpc-js";
import { loadProto } from "@sermocino/grpc-contracts";
const grpcObject = loadProto("user.proto");
const userPackage = grpcObject.user;

async function createUser(call, callback) {
  const { authId, email } = call.request;
  console.log("CreateUser request:", { authId, email });

  try {
    callback(null, { success: true });
  } catch (err) {
    console.error("Error:", err);
    callback(null, { success: false, error: "DB_FAILED" });
  }
}
const server = new grpc.Server();

server.addService(userPackage.UserService.service, {
  CreateUser: createUser,
});

server.bindAsync(
  "0.0.0.0:50052",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) {
      console.error("Bind failed:", err);
      return;
    }
    console.log("User gRPC server running on port 50052");
  }
);