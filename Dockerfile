# syntax=docker/dockerfile:1

# ---- Build stage ---------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first (better layer caching on rebuilds)
COPY package.json package-lock.json ./
RUN npm ci

# Build the static site (astro:assets image optimization needs the
# devDependency `sharp`, so this must run before any --omit=dev prune)
COPY . .
RUN npm run build

# ---- Production stage -----------------------------------------------------
FROM node:22-alpine AS production
WORKDIR /app

# `serve` — minimal static file server, no SPA fallback rewrite (this is a
# real multi-page Astro site: every route already has its own index.html).
RUN npm install -g serve@14

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-l", "3000", "./dist"]
