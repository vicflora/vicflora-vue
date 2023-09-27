import cache from './cache'

export default function(ctx) {
  return {
    httpEndpoint: '/graphql',
    cache
  }
}
