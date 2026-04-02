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