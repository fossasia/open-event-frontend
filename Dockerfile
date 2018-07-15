FROM node:8-stretch
LABEL maintainer="Max Lorenz <max-lorenz@gmx.net>"

WORKDIR /app

RUN yarn global add ember-cli

# Get deps
COPY package.json .
RUN yarn

# Copy all files for the build
COPY . .

# Run ember server
CMD ember server
