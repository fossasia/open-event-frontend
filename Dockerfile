FROM node:8-stretch
LABEL maintainer="Max Lorenz <max-lorenz@gmx.net>"

WORKDIR /app

# RUN git config --global url.'https://'.insteadOf git://

# Get deps
COPY . .
RUN yarn
RUN yarn global add ember-cli
CMD ember server
