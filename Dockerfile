FROM node:10.15-alpine as builder

LABEL maintainer="Niranjan Rajendran <me@niranjan.io>"

WORKDIR /app

RUN apk add git python-dev make g++ gettext

COPY package.json yarn.lock fastboot/server.js ./

RUN yarn install

COPY . .

RUN  touch .env && node scripts/l10n.js generate  && JOBS=1 npx ember build -prod

##
##

FROM node:10.15-alpine

COPY fastboot /fastboot

COPY --from=builder /app/dist /fastboot/app

WORKDIR /fastboot

RUN npm install --no-save && cd app && npm install --no-save

EXPOSE 4000

CMD ["node", "server.js"]
