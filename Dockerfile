FROM node:12-alpine as builder

WORKDIR /app

RUN apk add git python-dev make g++ gettext

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
ARG api_host
ARG google_api_key
ENV API_HOST=$api_host
ENV GOOGLE_API_KEY=$google_api_key
RUN yarn l10n:generate && \
    touch .env && \
    JOBS=1 yarn build -prod

##
##

FROM node:12-alpine

WORKDIR /fastboot

COPY --from=builder /app/dist/ dist/

RUN apk add --no-cache ca-certificates nginx && \
    cp dist/package.json . && \
    yarn install && \
    yarn add fastboot-app-server dotenv lodash && \
    rm -rf yarn.lock && \
    yarn cache clean

COPY scripts/* ./scripts/
COPY config/environment.js ./config/

RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/conf.d
RUN mkdir -p /run/nginx

EXPOSE 4000

CMD ["sh", "scripts/container_start.sh"]
