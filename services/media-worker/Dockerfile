FROM node:20-bookworm-slim

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set pnpm store
RUN pnpm config set store-dir /pnpm-store

# Copy root workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy all workspace package.jsons (for dependency graph)
COPY packages ./packages
COPY services ./services

# Install dependencies
RUN pnpm install

# Copy full source
COPY . .

# Build only media-worker
RUN pnpm --filter media-worker build

# Move into worker directory
WORKDIR /app/services/media-worker

# Run worker
CMD ["node", "dist/index.js"]