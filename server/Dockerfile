# Build stage
FROM node:18-alpine as build
WORKDIR /build 
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate
RUN npx tsc

# Runtime stage
FROM node:18-alpine
WORKDIR /api
COPY --from=build /build/package*.json ./
COPY --from=build /build/dist ./dist
COPY --from=build /build/drizzle ./drizzle
RUN npm install --production
CMD ["node", "./dist/index.js"]
