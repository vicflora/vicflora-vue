<!--
 Copyright 2022 Royal Botanic Gardens Board
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <div>
    <a 
      v-b-modal.filter-config-modal
      class="vf-filter-config-button"
      title="Configure filters"
    >
      <FontAwesomeIcon icon="gear"/>
    </a>

    <b-modal 
      id="filter-config-modal" 
      class="vf-filter-config-modal"
      title="Configure filters"
      title-tag="h1"
      size="lg"
      @ok="onOk"
    >
      <b-container>
        <div v-if="filterGroups">
          <SearchFilterConfigGroup 
            v-for="group in filterGroups" 
            :key="group.label"
            :filterGroup="group"
          />
        </div>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { FILTER_GROUPS } from '@/constants/facet-fields'
import { mapGetters } from 'vuex'

const SearchFilterConfigGroup = () => import('@/components/Search/SearchFilterConfigGroup')

export default {
  name: "SearchFilterConfig",
  components: {
    SearchFilterConfigGroup,
  },
  computed: {
    filterGroups() {
      let groups = this.$store.getters['search/getFilterGroups']
      const loggedIn = this.$store.getters['isLoggedIn']
      if (!loggedIn) {
        groups = groups.filter( group => {
          return group.visibility === 'public'
        })
      }
      return groups
    }
  }, 
  methods: {
    onOk() {
      this.$store.dispatch('search/updateFilterSelection')
      $nuxt.$emit('search-filter-config-changed')
    }
  }
}
</script>

<style lang="scss">
.vf-filter-config-button {
  font-size: 140%;
}

.vf-filter-config-modal {
  font-size: 14px;

  .modal-header h1 {
    font-size: 1.5rem;
  }
}
</style>