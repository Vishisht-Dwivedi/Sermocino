FROM node:20-bookworm-slim

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install
RUN pnpm --filter @sermocino/web build

WORKDIR /app/clients/web

EXPOSE 3000

CMD ["pnpm", "start"]