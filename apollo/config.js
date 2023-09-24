import cache from './cache'

export default function(ctx) {
  return {
    httpEndpoint: process.server
        ? 'http://nginx:81/graphql'
        : '/graphql',
    cache
  }
}
