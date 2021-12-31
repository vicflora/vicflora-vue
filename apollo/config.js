import cache from './cache'

export default function(ctx) {
  const endpoint = process.env.graphqlEndpoint
  const token = process.env.token
  return {
    httpEndpoint: endpoint,
    // getAuth: () => `Bearer ${token}`,
    cache
  }
}
