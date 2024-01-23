FROM node:16-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

COPY . .

RUN yarn
RUN yarn build


CMD [ "yarn", "preview" ]