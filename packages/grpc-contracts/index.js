import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function loadProto(protoFile) {
  const fullPath = path.join(__dirname, "proto", protoFile);

  const packageDef = protoLoader.loadSync(fullPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
  });

  return grpc.loadPackageDefinition(packageDef);
}