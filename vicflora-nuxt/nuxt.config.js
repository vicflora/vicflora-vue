export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vicflora-nuxt',
    htmlAttrs: {
      lang: 'en',
      dir: 'ltr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-scrollactive.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/apollo',
    '@nuxt/content',

    
  ],
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },
  apollo: {
    clientConfigs: {
      default: {
        // httpEndpoint: 'http://vicflora-api-test.rbg.vic.gov.au/graphql',
        httpEndpoint: 'https://vicflora-api.rbg.vic.gov.au/graphql',
      }
    }
  },
  content: {
    markdown: {
      tocDepth: 6,
    }
  },

  plugins: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      ({ isServer }) => 'vue-typeahead-bootstrap'
    ],
  },
  styleResources: {
    scss: [
        '@/assets/main.scss'
    ]
},

}
