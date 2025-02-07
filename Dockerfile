# Dockerfile
FROM node:16-alpine3.14

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update \
    && apk upgrade \
    && apk add git \
    && apk add --update python3 make g++ \
    && rm -rf /var/cache/apk/*

COPY package.json ./
RUN yarn install --ignore-engines
COPY . .