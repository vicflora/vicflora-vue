# Dockerfile
FROM node:16-alpine3.14

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update && apk upgrade
RUN apk add git

COPY package.json ./
RUN yarn install
COPY . .

ARG GRAPHQL_ENDPOINT
ENV GRAPHQL_ENDPOINT=$GRAPHQL_ENDPOINT

ARG GEOSERVER_WMS
ENV GEOSERVER_WMS=$GEOSERVER_WMS

RUN yarn build

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

CMD [ "yarn", "start" ]