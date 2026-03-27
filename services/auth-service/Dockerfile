FROM node:20-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm config set store-dir /pnpm-store

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY services/auth-service/package.json ./services/auth-service/

RUN pnpm install

COPY . .

RUN pnpm --filter @sermocino/auth-service exec prisma generate

RUN pnpm --filter @sermocino/auth-service build

WORKDIR /app/services/auth-service

CMD ["pnpm", "dev"]