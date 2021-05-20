export const state = () => ({
  auth: false,
  taxon: null,
  formattedName: null,
  searchResult: null,
  key: null
});

export const mutations = {
    storeAuthenticationInfo(state, data) {
        if (data.serverData.auth) {
            state.auth = data.serverData.auth;
            state.user = data.serverData.user;
        }
    },
    storeTaxon(state, taxon) {
        state.taxon = taxon.data;
    },
    addClassification(state, classification) {
        state.taxon.classification = classification.classification.data;
    },
    addSiblings(state, siblings) {
        state.taxon.siblings = siblings.siblings.data;
    },
    addChildren(state, children) {
        state.taxon.children = children.children.data;
    },
    addCultivars(state, cultivars) {
        state.taxon.cultivars = cultivars.cultivars.data;
    },
    storeSearchResult(state, data) {
        state.searchResult = data.data;
    },
    addImages(state, data) {
      if (state.taxon.images) {
        Array.prototype.push.apply(state.taxon.images, data)
      }
      else {
        state.taxon.images = data
      }
    },
    storeKey(state, key) {
      state.key = key
    }
};

export const actions = {
    addImages (context, data) {
        context.commit('addImages', data)
      },
    storeKey (context, data) {
        context.commit('storeKey', data)
    }
}
