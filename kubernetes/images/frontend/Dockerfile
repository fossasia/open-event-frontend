FROM node:8-alpine
MAINTAINER Niranjan Rajendran <niranjan94@yahoo.com>

COPY server /server
COPY deploy-dist/ /server/app

WORKDIR /server

RUN npm install --no-save && cd app && npm install --no-save


CMD ["node", "fastboot-server.js"]
