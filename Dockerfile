# Stage 1: Install dependencies only when needed
FROM node:20 AS base
 
FROM base AS deps

RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY ./prisma/schema.prisma ./prisma/schema.prisma

# Stage 2: Rebuild the source code only when needed
FROM base AS build
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Install pnpm globally in the builder stage as well
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
ARG DATABASE_URL=${DATABASE_URL}
RUN pnpm run build

# Stage 3: Production image, copy all the files and run the app
FROM base
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p /app/.next/cache/images && chown nextjs:nodejs /app/.next/cache/images
VOLUME /app/.next/cache/images

# Copy necessary files from the builder stage
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["pnpm", "run", "start"]