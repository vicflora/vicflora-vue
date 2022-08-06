// Copyright 2022 Royal Botanic Gardens Board
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { FILTER_FIELDS, FILTER_GROUPS, DEFAULT_FACET_FIELDS } from '~/constants/facet-fields.js'

export const state = () => ({
  filterFields: FILTER_FIELDS.map(field => {
    return {
      ...field,
      selected: DEFAULT_FACET_FIELDS.indexOf(field.name) > -1
    }
  }),
  filterGroups: FILTER_GROUPS,
  selectedFilterFields: DEFAULT_FACET_FIELDS
})

export const getters = {
  getFilterFields(state) {
    return state.filterFields
  },
  getFilterGroups(state) {
    return state.filterGroups
  },
  getSelectedFilterFields(state) {
    return state.selectedFilterFields
  }
}

export const mutations = {
  toggleFilterSelection(state, fieldName) {
    const index = state.filterFields.findIndex(field => {
      return field.name === fieldName
    })
    state.filterFields[index].selected = !state.filterFields[index].selected
  },
  updateSelectedFilterFields(state) {
    state.selectedFilterFields = state.filterFields.filter(field => {
      return field.selected
    }).map(field => {
      return field.name
    })
  }
}

export const actions = {
  toggleFilter (context, field) {
    context.commit('toggleFilterSelection', field)
  },
  updateFilterSelection (context) {
    context.commit('updateSelectedFilterFields')
  }
}
