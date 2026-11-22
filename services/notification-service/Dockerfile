# Build from the repo root: docker build -f services/notification-service/Dockerfile .
FROM node:22-alpine AS build
WORKDIR /repo
COPY . .
RUN npm ci
RUN npm run build -w @stallcall/shared -w @stallcall/notification-service

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /repo
COPY package.json package-lock.json ./
COPY packages/shared/package.json packages/shared/
COPY services/notification-service/package.json services/notification-service/
RUN npm ci --omit=dev -w @stallcall/notification-service && npm cache clean --force
COPY --from=build /repo/packages/shared/dist packages/shared/dist
COPY --from=build /repo/services/notification-service/dist services/notification-service/dist
USER node
WORKDIR /repo/services/notification-service
ENV PORT=4004
EXPOSE 4004
CMD ["node", "dist/index.js"]
