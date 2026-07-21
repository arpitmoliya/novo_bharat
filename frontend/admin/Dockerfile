# ---- Dependencies ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# ---- Dev (hot reload) ----
# Used only by docker-compose.override.yml. Source is bind-mounted at runtime,
# so edits on the host are picked up live by `next dev`.
FROM node:20-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- Build ----
FROM node:20-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL=http://localhost:3003/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Runtime (standalone) ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Bind to all interfaces. Docker sets HOSTNAME to the container ID, which the
# Next.js standalone server would otherwise bind to, making it unreachable (502).
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
