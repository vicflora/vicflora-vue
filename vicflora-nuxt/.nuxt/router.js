import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5678fb9f = () => interopDefault(import('..\\pages\\Bioregions\\index.vue' /* webpackChunkName: "pages/Bioregions/index" */))
const _412405f4 = () => interopDefault(import('..\\pages\\Flora\\index.vue' /* webpackChunkName: "pages/Flora/index" */))
const _514f28de = () => interopDefault(import('..\\pages\\Matrix-keys\\index.vue' /* webpackChunkName: "pages/Matrix-keys/index" */))
const _6182b188 = () => interopDefault(import('..\\pages\\Flora\\Checklist\\index.vue' /* webpackChunkName: "pages/Flora/Checklist/index" */))
const _290b09c0 = () => interopDefault(import('..\\pages\\Flora\\Classification\\index.vue' /* webpackChunkName: "pages/Flora/Classification/index" */))
const _208328de = () => interopDefault(import('..\\pages\\Flora\\Download\\index.vue' /* webpackChunkName: "pages/Flora/Download/index" */))
const _9d0824f0 = () => interopDefault(import('..\\pages\\Flora\\Glossary\\index.vue' /* webpackChunkName: "pages/Flora/Glossary/index" */))
const _77df8ba2 = () => interopDefault(import('..\\pages\\Flora\\Key\\index.vue' /* webpackChunkName: "pages/Flora/Key/index" */))
const _4f99c6be = () => interopDefault(import('..\\pages\\Flora\\Search\\index.vue' /* webpackChunkName: "pages/Flora/Search/index" */))
const _216a9038 = () => interopDefault(import('..\\pages\\Flora\\Taxon\\index.vue' /* webpackChunkName: "pages/Flora/Taxon/index" */))
const _336c1f22 = () => interopDefault(import('..\\pages\\Flora\\Key\\keybase.js' /* webpackChunkName: "pages/Flora/Key/keybase" */))
const _e95f07b0 = () => interopDefault(import('..\\pages\\Flora\\Classification\\_id.vue' /* webpackChunkName: "pages/Flora/Classification/_id" */))
const _1d74fc57 = () => interopDefault(import('..\\pages\\Flora\\Key\\_id.vue' /* webpackChunkName: "pages/Flora/Key/_id" */))
const _552d634c = () => interopDefault(import('..\\pages\\Flora\\Taxon\\_id.vue' /* webpackChunkName: "pages/Flora/Taxon/_id" */))
const _68ff59c7 = () => interopDefault(import('..\\pages\\Bioregions\\_id.vue' /* webpackChunkName: "pages/Bioregions/_id" */))
const _54a46a74 = () => interopDefault(import('..\\pages\\Matrix-keys\\_id.vue' /* webpackChunkName: "pages/Matrix-keys/_id" */))
const _711d3b96 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _30d12b7e = () => interopDefault(import('..\\pages\\_id.vue' /* webpackChunkName: "pages/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Bioregions",
    component: _5678fb9f,
    name: "Bioregions"
  }, {
    path: "/Flora",
    component: _412405f4,
    name: "Flora"
  }, {
    path: "/Matrix-keys",
    component: _514f28de,
    name: "Matrix-keys"
  }, {
    path: "/Flora/Checklist",
    component: _6182b188,
    name: "Flora-Checklist"
  }, {
    path: "/Flora/Classification",
    component: _290b09c0,
    name: "Flora-Classification"
  }, {
    path: "/Flora/Download",
    component: _208328de,
    name: "Flora-Download"
  }, {
    path: "/Flora/Glossary",
    component: _9d0824f0,
    name: "Flora-Glossary"
  }, {
    path: "/Flora/Key",
    component: _77df8ba2,
    name: "Flora-Key"
  }, {
    path: "/Flora/Search",
    component: _4f99c6be,
    name: "Flora-Search"
  }, {
    path: "/Flora/Taxon",
    component: _216a9038,
    name: "Flora-Taxon"
  }, {
    path: "/Flora/Key/keybase",
    component: _336c1f22,
    name: "Flora-Key-keybase"
  }, {
    path: "/Flora/Classification/:id",
    component: _e95f07b0,
    name: "Flora-Classification-id"
  }, {
    path: "/Flora/Key/:id",
    component: _1d74fc57,
    name: "Flora-Key-id"
  }, {
    path: "/Flora/Taxon/:id",
    component: _552d634c,
    name: "Flora-Taxon-id"
  }, {
    path: "/Bioregions/:id",
    component: _68ff59c7,
    name: "Bioregions-id"
  }, {
    path: "/Matrix-keys/:id?",
    component: _54a46a74,
    name: "Matrix-keys-id"
  }, {
    path: "/",
    component: _711d3b96,
    name: "index"
  }, {
    path: "/:id",
    component: _30d12b7e,
    name: "id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
