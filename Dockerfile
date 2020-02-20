FROM node:lts-alpine

RUN npm install -g nodemon

WORKDIR /app

ENV NODE_PATH ./

COPY package*.json /app

RUN npm install && mv /app/node_modules /NODE_PATH

COPY . /app

EXPOSE 8080

CMD [ "npm", "start:dev" ]
