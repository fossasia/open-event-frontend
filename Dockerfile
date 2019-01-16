FROM node:10.15-alpine as builder
LABEL maintainer="Niranjan Rajendran <me@niranjan.io>"

WORKDIR /app

RUN apk add git python-dev make g++

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
RUN touch .env && JOBS=1 npx ember build -prod

##
##

FROM steebchen/nginx-spa:stable

COPY --from=builder /app/dist /app

EXPOSE 80

CMD ["nginx"]
