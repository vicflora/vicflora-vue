import cache from './cache'

export default function(ctx) {
  const token = process.env.token
  return {
    httpEndpoint: `http://vicflora.test/graphql`,
    // getAuth: () => `Bearer ${token}`,
    cache
  }
}