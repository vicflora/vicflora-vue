export const state = () => ({
  token: null,
  user: {},
  lastSearch: {},
})

export const getters = {
  isLoggedIn(state) {
    return state.token !== null
  },
  user(state) {
    return state.user
  }
}

  
export const mutations = {
  storeToken (state, token) {
    state.token = token
  },
  storeUser (state, user) {
    state.user = user
  },
  deleteToken (state) {
    state.token = null
  },
  deleteUser (state) {
    state.user = {}
  },
  storeSearchParams (state, params) {
    state.lastSearch = params
  },
  setUserPreferences(state, preferences) {
    state.user.preferences = preferences
  }
}
  
export const actions = {
  storeToken (context, token) {
    context.commit('storeToken', token)
  },
  storeUser (context, user) {
    context.commit('storeUser', user)
  },
  logout (context) {
    context.commit('deleteUser')
    context.commit('deleteToken')
  },
  storeSearchParams (context, params) {
    context.commit('storeSearchParams', params)
  },
  updateUserPreferences (context, preferences) {
    context.commit('setUserPreferences', preferences)
  },
}
  