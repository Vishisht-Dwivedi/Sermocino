FROM node:20-bookworm-slim

WORKDIR /app

RUN npm install -g pnpm

# Copy workspace config
COPY pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy ONLY manifests first (better caching)
COPY services/auth-service/package.json services/auth-service/package.json

# Install all workspace deps (needed for prisma CLI)
RUN pnpm install

# Now copy full source
COPY services/auth-service services/auth-service

WORKDIR /app/services/auth-service

# Generate prisma client inside the service directory
RUN pnpm prisma generate

# Build TS
RUN pnpm build

EXPOSE 3000
CMD ["node", "dist/index.js"]
