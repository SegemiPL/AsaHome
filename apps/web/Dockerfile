# ============================================================================
# Next.js Dockerfile — Multi-stage production build
# ============================================================================
# Based on Next.js standalone output.
#
# Build:
#   docker build -f apps/web/Dockerfile -t asahome-web:latest .
# Run:
#   docker run -p 3000:3000 asahome-web:latest
# ============================================================================

# ---- Stage 1: Dependencies ----
FROM node:22.14.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json
COPY packages/api-client/package.json ./packages/api-client/package.json
COPY packages/config-eslint/package.json ./packages/config-eslint/package.json
COPY packages/config-typescript/package.json ./packages/config-typescript/package.json

RUN corepack enable && pnpm install --frozen-lockfile

# ---- Stage 2: Builder ----
FROM node:22.14.0-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && pnpm --filter @asahome/web build

# ---- Stage 3: Runner ----
FROM node:22.14.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
