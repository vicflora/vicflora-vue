export const state = () => ({
  token: null,
  user: {},
})

export const getters = {
  isLoggedIn(state) {
    return state.token !== null
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
}
  