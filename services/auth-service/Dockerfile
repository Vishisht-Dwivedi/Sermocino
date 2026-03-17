FROM node:20-bookworm-slim

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install
RUN pnpm --filter @sermocino/auth-service exec prisma generate
RUN pnpm --filter @sermocino/auth-service build

WORKDIR /app/services/auth-service

EXPOSE 3000

CMD ["node", "dist/index.js"]