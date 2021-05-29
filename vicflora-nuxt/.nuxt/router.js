import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3c58f590 = () => interopDefault(import('..\\pages\\Bioregions\\index.vue' /* webpackChunkName: "pages/Bioregions/index" */))
const _fc2fd066 = () => interopDefault(import('..\\pages\\Flora\\index.vue' /* webpackChunkName: "pages/Flora/index" */))
const _3145d265 = () => interopDefault(import('..\\pages\\Matrix-keys\\index.vue' /* webpackChunkName: "pages/Matrix-keys/index" */))
const _54abe461 = () => interopDefault(import('..\\pages\\Flora\\Checklist\\index.vue' /* webpackChunkName: "pages/Flora/Checklist/index" */))
const _e7c692f2 = () => interopDefault(import('..\\pages\\Flora\\Classification\\index.vue' /* webpackChunkName: "pages/Flora/Classification/index" */))
const _6a6bb6e5 = () => interopDefault(import('..\\pages\\Flora\\Download\\index.vue' /* webpackChunkName: "pages/Flora/Download/index" */))
const _093708e2 = () => interopDefault(import('..\\pages\\Flora\\Glossary\\index.vue' /* webpackChunkName: "pages/Flora/Glossary/index" */))
const _4f6ac3c8 = () => interopDefault(import('..\\pages\\Flora\\Key\\index.vue' /* webpackChunkName: "pages/Flora/Key/index" */))
const _0c8c2a85 = () => interopDefault(import('..\\pages\\Flora\\Search\\index.vue' /* webpackChunkName: "pages/Flora/Search/index" */))
const _0e293f3d = () => interopDefault(import('..\\pages\\Flora\\Taxon\\index.vue' /* webpackChunkName: "pages/Flora/Taxon/index" */))
const _1362c8a9 = () => interopDefault(import('..\\pages\\Flora\\Key\\keybase.js' /* webpackChunkName: "pages/Flora/Key/keybase" */))
const _72a4aeaf = () => interopDefault(import('..\\pages\\Flora\\Classification\\_id.vue' /* webpackChunkName: "pages/Flora/Classification/_id" */))
const _8631cfa0 = () => interopDefault(import('..\\pages\\Flora\\Key\\_id.vue' /* webpackChunkName: "pages/Flora/Key/_id" */))
const _3ef02636 = () => interopDefault(import('..\\pages\\Flora\\Taxon\\_id.vue' /* webpackChunkName: "pages/Flora/Taxon/_id" */))
const _087175a0 = () => interopDefault(import('..\\pages\\Bioregions\\_id.vue' /* webpackChunkName: "pages/Bioregions/_id" */))
const _247f2a0d = () => interopDefault(import('..\\pages\\Matrix-keys\\_id.vue' /* webpackChunkName: "pages/Matrix-keys/_id" */))
const _1b8ea2af = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _8b18f652 = () => interopDefault(import('..\\pages\\_id.vue' /* webpackChunkName: "pages/_id" */))

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
    component: _3c58f590,
    name: "Bioregions"
  }, {
    path: "/Flora",
    component: _fc2fd066,
    name: "Flora"
  }, {
    path: "/Matrix-keys",
    component: _3145d265,
    name: "Matrix-keys"
  }, {
    path: "/Flora/Checklist",
    component: _54abe461,
    name: "Flora-Checklist"
  }, {
    path: "/Flora/Classification",
    component: _e7c692f2,
    name: "Flora-Classification"
  }, {
    path: "/Flora/Download",
    component: _6a6bb6e5,
    name: "Flora-Download"
  }, {
    path: "/Flora/Glossary",
    component: _093708e2,
    name: "Flora-Glossary"
  }, {
    path: "/Flora/Key",
    component: _4f6ac3c8,
    name: "Flora-Key"
  }, {
    path: "/Flora/Search",
    component: _0c8c2a85,
    name: "Flora-Search"
  }, {
    path: "/Flora/Taxon",
    component: _0e293f3d,
    name: "Flora-Taxon"
  }, {
    path: "/Flora/Key/keybase",
    component: _1362c8a9,
    name: "Flora-Key-keybase"
  }, {
    path: "/Flora/Classification/:id",
    component: _72a4aeaf,
    name: "Flora-Classification-id"
  }, {
    path: "/Flora/Key/:id",
    component: _8631cfa0,
    name: "Flora-Key-id"
  }, {
    path: "/Flora/Taxon/:id",
    component: _3ef02636,
    name: "Flora-Taxon-id"
  }, {
    path: "/Bioregions/:id",
    component: _087175a0,
    name: "Bioregions-id"
  }, {
    path: "/Matrix-keys/:id?",
    component: _247f2a0d,
    name: "Matrix-keys-id"
  }, {
    path: "/",
    component: _1b8ea2af,
    name: "index"
  }, {
    path: "/:id",
    component: _8b18f652,
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
