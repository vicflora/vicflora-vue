import cache from './cache'
import { GRAPHQL_ENDPOINT } from '@/constants/graphql-endpoint'

export default function(ctx) {
  const endpoint = GRAPHQL_ENDPOINT
  const token = process.env.token
  return {
    httpEndpoint: endpoint,
    // getAuth: () => `Bearer ${token}`,
    cache
  }
}
