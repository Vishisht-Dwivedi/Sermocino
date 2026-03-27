FROM node:20-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm config set store-dir /pnpm-store

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY clients/web/package.json ./clients/web/

RUN pnpm install

COPY . .

WORKDIR /app/clients/web

CMD ["pnpm", "dev"]