// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'vicflora-app',
        // URL to the GraphQL API
        url: 'http://vicflora-api-test.rbg.vic.gov.au/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }