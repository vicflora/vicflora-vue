import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//import Bootstrap as UI framework
//import Bootstrp Icons as Icons library
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

//use customized variable
//import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/styles.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import font style
import './assets/fonts/fonts.css'
//import Apollo
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'


const apolloClient = new ApolloClient({
  // You should use your graphQL URL here
  uri: 'http://vicflora-api-test.rbg.vic.gov.au/graphql'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
