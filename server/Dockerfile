FROM node:18-alpine as build
WORKDIR /api

FROM build as prod
COPY package*.json .
RUN npm ci
ENV NODE_ENV=production
COPY . .
RUN npm run build
CMD npm run db:push && node ./dist/index.js

