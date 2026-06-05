FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/shared ./packages/shared
COPY backend/package.json ./backend/
RUN npm ci -w backend --include-workspace-root
COPY backend ./backend
RUN npm run build -w backend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY packages/shared ./packages/shared
COPY backend/package.json ./backend/
RUN npm ci -w backend --omit=dev --include-workspace-root
COPY --from=builder /app/backend/dist ./backend/dist
COPY backend/content ./backend/content
WORKDIR /app/backend
EXPOSE 4000
CMD ["node", "dist/index.js"]
