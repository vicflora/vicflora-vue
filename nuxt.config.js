const webpack = require("webpack");
const axios = require("axios")
const fs = require("fs-extra")

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "VicFlora – Royal Botanic Gardens Victoria",
    htmlAttrs: {
      lang: "en",
      dir: "ltr"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        // src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vue-scrollactive.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
      "@nuxtjs/style-resources",
      '@nuxtjs/fontawesome',
  ],

  fontawesome: {
    icons: {
      solid: [
        'faRotate',
        'faArrowRotateLeft',
      ]
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/apollo",
    "@nuxt/content"
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },
  apollo: {
    clientConfigs: {
      default: '~/apollo/config.js'
    }
  },
  content: {
    markdown: {
      tocDepth: 6
    }
  },

  plugins: [
    '~plugins/leaflet.client.js'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isServer }) => "vue-typeahead-bootstrap"],
    plugins: [
        new webpack.ProvidePlugin({
            '$' : 'jquery'
        })
    ]
  },
  styleResources: {
    scss: ["@/assets/main.scss"]
  },
  server: {
    host: "0"
  },
  env: {
    graphqlEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost/graphql',
    geoserverWms: process.env.GEOSERVER_WMS || 'http://localhost:8080/geoserver'
  },
  hooks: {
    build: {
      before (builder) {
        axios.post(process.env.GRAPHQL_ENDPOINT, {
          query: `
            query schema{
              __schema{
                types{
                  kind
                  name
                  possibleTypes {
                    name
                    description
                  }
                }
              }
            }`
        }).then(({ data }) => {
          fs.writeFile('apollo/fragmentTypes.json', JSON.stringify(data.data) + '\r\n', ((err) => {
            if (err) {
              /* eslint-disable-next-line */
              console.log(err)
            }
          }))
        })
      }
    }
  }

};
