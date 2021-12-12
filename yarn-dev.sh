#!/bin/bash

# set NODE_OPTIONS environment variable and then run script, so that we can run
# this without failure with docker-compose

export NODE_OPTIONS=--openssl-legacy-provider

yarn --cwd /var/www/vicflora-vue dev
