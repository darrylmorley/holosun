# Install dependencies only when needed
FROM node:18-bullseye-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm install

# Rebuild the source code only when needed
FROM node:18-bullseye-slim AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG DATABASE_URL=${DATABASE_URL}
# ENV DATABASE_URL ${DATABASE_URL}
RUN npm run build
RUN npm prune --production

# Production image, copy all the files and run next
FROM node:18-bullseye-slim AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p /app/.next/cache/images && chown nextjs:nodejs /app/.next/cache/images
VOLUME /app/.next/cache/images

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json


USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]