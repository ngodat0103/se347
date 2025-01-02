FROM node:22.11.0-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e    AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:22.11.0-alpine@sha256:b64ced2e7cd0a4816699fe308ce6e8a08ccba463c757c00c14cd372e3d2c763e

RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser
RUN mkdir -p /app && chown appuser:appgroup /app

WORKDIR /app

COPY --chmod=700 --chown=appuser --from=builder /app/.next ./.next
COPY --chmod=500 --chown=appuser --from=builder /app/node_modules ./node_modules
COPY --chmod=500 --chown=appuser --from=builder /app/package.json ./
COPY --chmod=500 --chown=appuser ./public ./public
USER appuser
EXPOSE 4200
CMD ["npm", "start"]
