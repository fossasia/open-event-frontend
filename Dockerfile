FROM node:10-alpine as builder
LABEL maintainer="Niranjan Rajendran <me@niranjan.io>"

WORKDIR /app

RUN apk add git python-dev make g++ gettext

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
ARG api_host
ARG google_api_key
ENV API_HOST=$api_host
ENV GOOGLE_API_KEY=$google_api_key
RUN node scripts/l10n.js generate && \
    touch .env && \
    JOBS=1 yarn build -prod

##
##

FROM node:10-alpine

WORKDIR /fastboot

COPY scripts/fastboot-server.js .
COPY --from=builder /app/dist/ app/

RUN apk add --no-cache ca-certificates && \
    cp app/package.json . && \
    yarn install && \
    yarn add fastboot-app-server && \
    rm -rf yarn.lock && \
    yarn cache clean

EXPOSE 4000

CMD ["node", "fastboot-server.js"]
