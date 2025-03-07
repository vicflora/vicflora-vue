# Dockerfile
FROM node:16-alpine3.14

RUN apk update \
    && apk upgrade \
    && apk add git \
    && apk add --update python3 make g++ \
    && rm -rf /var/cache/apk/* \
    && mkdir -p /usr/src/nuxt-app

# create destination directory
WORKDIR /usr/src/nuxt-app

COPY package*.json ./
RUN yarn install --ignore-engines && yarn cache clean
COPY . .
