FROM node:22-alpine AS base

# Install dependencies required by Prisma and Node.js
RUN apk add --no-cache libc6-compat openssl git bash

WORKDIR /app

# Copy only schema.prisma for generating Prisma Client
COPY ./prisma ./prisma

# Install dependencies and generate Prisma Client
FROM base AS prisma
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@latest && pnpm install --frozen-lockfile
RUN npx prisma generate

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=prisma /app/node_modules ./node_modules
COPY . .
ARG DATABASE_URL=${DATABASE_URL}
RUN npm install -g pnpm@latest && pnpm run build

# Prepare the runtime environment
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Add Node.js user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy build output and necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js