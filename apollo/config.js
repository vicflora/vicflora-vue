import cache from './cache'

export default function(ctx) {
  const token = process.env.token
  return {
    httpEndpoint: `http://vicflora-int.rbg.vic.gov.au/graphql`,
    // getAuth: () => `Bearer ${token}`,npm run dev
    cache
  }
}
