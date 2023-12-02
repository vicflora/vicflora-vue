import cache from './cache'

export default function(ctx) {
  const endpoint = process.env.graphqlEndpoint
  return {
    httpEndpoint: endpoint,
    cache
  }
}