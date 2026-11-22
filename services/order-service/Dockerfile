# Build from the repo root: docker build -f services/order-service/Dockerfile .
FROM node:22-alpine AS build
WORKDIR /repo
COPY . .
RUN npm ci
RUN npm run build -w @stallcall/shared -w @stallcall/order-service

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /repo
COPY package.json package-lock.json ./
COPY packages/shared/package.json packages/shared/
COPY services/order-service/package.json services/order-service/
RUN npm ci --omit=dev -w @stallcall/order-service && npm cache clean --force
COPY --from=build /repo/packages/shared/dist packages/shared/dist
COPY --from=build /repo/services/order-service/dist services/order-service/dist
USER node
WORKDIR /repo/services/order-service
ENV PORT=4002
EXPOSE 4002
CMD ["node", "dist/index.js"]
