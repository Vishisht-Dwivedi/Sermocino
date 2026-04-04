FROM node:20-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm config set store-dir /pnpm-store

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

COPY packages/shared/package.json ./packages/shared/
COPY packages/grpc-contracts/package.json ./packages/grpc-contracts/
COPY services/media-service/package.json ./services/media-service/

RUN pnpm install

COPY . .

RUN pnpm --filter media-service build

WORKDIR /app/services/media-service

CMD ["node", "dist/index.js"]
#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Y2EwM2Y0NS0zY2Q5LTRiMmItOGQ5NS1iNTY1ODg5NjVjOGYiLCJzaWQiOiJmZTdmMjZkNC1kNDA0LTQxNWYtODI4NC1mZjNkMGQyZDhkZDQiLCJpYXQiOjE3NzUyMjczODUsImV4cCI6MTc3NTIyODI4NSwiYXVkIjoic2VybW9jaW5vLWFwaSIsImlzcyI6InNlcm1vY2luby1hdXRoIn0.PYR6zuxXORA-iQ8Kg08MgOx3uj6mT4BzhvJuH2m40PMeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Y2EwM2Y0NS0zY2Q5LTRiMmItOGQ5NS1iNTY1ODg5NjVjOGYiLCJzaWQiOiJmZTdmMjZkNC1kNDA0LTQxNWYtODI4NC1mZjNkMGQyZDhkZDQiLCJpYXQiOjE3NzUyMjczODUsImV4cCI6MTc3NTIyODI4NSwiYXVkIjoic2VybW9jaW5vLWFwaSIsImlzcyI6InNlcm1vY2luby1hdXRoIn0.PYR6zuxXORA-iQ8Kg08MgOx3uj6mT4BzhvJuH2m40PM