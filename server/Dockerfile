# Build stage
FROM node:18-alpine as base
WORKDIR /api
EXPOSE 4000

FROM base as dev
ENV NODE_ENV=development
COPY package*.json .
RUN npm install
COPY . .
CMD npm run db:push && npm run start

FROM base as prod
ENV NODE_ENV=production
COPY package*.json .
RUN npm install 
RUN npm run db:push
COPY . .
CMD npm run start

