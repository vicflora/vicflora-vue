const webpack = require("webpack");
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "vicflora-nuxt",
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
    "~/plugins/vue-scrollactive.client.js",
    "~/plugins/vue2-leaflet-fullscreen.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],

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
      default: {
        httpEndpoint: 'http://vicflora.test/graphql',
      }
    }
  },
  content: {
    markdown: {
      tocDepth: 6
    }
  },

  plugins: [
    { src: '~plugins/leaflet.js', ssr: false },
    '~/plugins/vue2-leaflet-fullscreen.client.js'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isServer }) => "vue-typeahead-bootstrap", 'vue2-leaflet-fullscreen'],
    plugins: [
        new webpack.ProvidePlugin({
            '$' : 'jquery'
        })
    ]
  },
  styleResources: {
    scss: ["@/assets/main.scss"]
  }
};
