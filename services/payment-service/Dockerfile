# Build from the repo root: docker build -f services/payment-service/Dockerfile .
FROM node:22-alpine AS build
WORKDIR /repo
COPY . .
RUN npm ci
RUN npm run build -w @stallcall/shared -w @stallcall/payment-service

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /repo
COPY package.json package-lock.json ./
COPY packages/shared/package.json packages/shared/
COPY services/payment-service/package.json services/payment-service/
RUN npm ci --omit=dev -w @stallcall/payment-service && npm cache clean --force
COPY --from=build /repo/packages/shared/dist packages/shared/dist
COPY --from=build /repo/services/payment-service/dist services/payment-service/dist
USER node
WORKDIR /repo/services/payment-service
ENV PORT=4003
EXPOSE 4003
CMD ["node", "dist/index.js"]
