FROM node:18-alpine as base
WORKDIR /app
EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development
COPY package*.json .
RUN npm install
COPY . .
CMD npm run dev

FROM base as prod
ENV NODE_ENV=production
COPY package*.json .
RUN npm install 
COPY . .
CMD npm run dev
