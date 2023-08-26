FROM node:18-alpine
#ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install 
#RUN npm install --production
COPY . .
CMD ["npm", "run", "dev"]
