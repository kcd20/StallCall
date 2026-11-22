# Build from the repo root: docker build -f services/menu-service/Dockerfile .
FROM node:22-alpine AS build
WORKDIR /repo
COPY . .
RUN npm ci
RUN npm run build -w @stallcall/shared -w @stallcall/menu-service

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /repo
COPY package.json package-lock.json ./
COPY packages/shared/package.json packages/shared/
COPY services/menu-service/package.json services/menu-service/
RUN npm ci --omit=dev -w @stallcall/menu-service && npm cache clean --force
COPY --from=build /repo/packages/shared/dist packages/shared/dist
COPY --from=build /repo/services/menu-service/dist services/menu-service/dist
USER node
WORKDIR /repo/services/menu-service
ENV PORT=4001
EXPOSE 4001
CMD ["node", "dist/index.js"]
