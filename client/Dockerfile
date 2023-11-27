FROM node:18-alpine as base
WORKDIR /app
EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
CMD npm run dev
