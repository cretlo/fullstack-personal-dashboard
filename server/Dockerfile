FROM node:18-alpine
#ENV NODE_ENV=production
WORKDIR /api 
COPY package*.json ./
RUN npm install
#RUN npm install --production
COPY . .
RUN chmod a+x ./docker-cmd.sh
RUN ls ./
CMD sh ./docker-cmd.sh
