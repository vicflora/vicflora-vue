export const state = () => ({
  areaName: null
})

export const getters = {
  areaName(state) {
    return state.areaName
  }
}

  
export const mutations = {
  storeAreaName (state, areaName) {
    state.areaName = areaName
  }
}
  
export const actions = {
  storeAreaName (context, areaName) {
    context.commit('storeAreaName', areaName)
  }
}
  