FROM danlynn/ember-cli:3.3.0 as builder
LABEL maintainer="Niranjan Rajendran <me@niranjan.io>"

WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install

ADD . .
RUN touch .env && ember build -prod

##
##

FROM steebchen/nginx-spa:stable

COPY --from=builder /app/dist /app

EXPOSE 80

CMD ["nginx"]
