# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json nest-cli.json ./
COPY src ./src
RUN npm run build

# ---- Dev (hot reload) ----
# Used only by docker-compose.override.yml. Source is bind-mounted at runtime,
# so edits on the host are picked up live by `nest start --watch`.
FROM node:20-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
CMD ["npm", "run", "start:dev"]

# ---- Runtime stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh
EXPOSE 3003
ENTRYPOINT ["./docker-entrypoint.sh"]
