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
  <BRow>
    <b-col cols="12"><h2 class="vf-filter-group-label">{{ filterGroup.label }}</h2></b-col>
    <b-col cols="4">
      <SearchFilterConfigField 
        v-for="field in leftColFields"
        :key="field.name"
        :facetField="field"
      />
    </b-col>
    <b-col v-if="middleColFields.length" cols="4">
      <SearchFilterConfigField 
        v-for="field in middleColFields"
        :key="field.name"
        :facetField="field"
      />
    </b-col>
    <b-col v-if="rightColFields.length" cols="4">
      <SearchFilterConfigField 
        v-for="field in rightColFields"
        :key="field.name"
        :facetField="field"
      />
    </b-col>
  </BRow>
</template>

<script>
const SearchFilterConfigField = () => import('@/components/Search/SearchFilterConfigField')

export default {
  name: "SearchFilterConfigGroup",
  components: {
    SearchFilterConfigField
  },
  props: {
    filterGroup: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filterFields() {
      return this.$store.getters['search/getFilterFields'].filter((field) => {
        return field.group === this.filterGroup.name
      })
    },
    leftColFields() {
      const index = Math.ceil(this.filterFields.length / 3)
      const leftCol = this.filterFields.slice(0, index)
      return leftCol
    },
    middleColFields() {
      const index = Math.ceil(this.filterFields.length / 3)
      const middleCol = this.filterFields.slice(index, index * 2)
      return middleCol
    },
    rightColFields() {
      let rightCol = []
      if (this.filterFields.length > 1) {
        const index = Math.ceil(this.filterFields.length / 3)
        rightCol = this.filterFields.slice(index * 2)
      }
      return rightCol
    }
  }
}
</script>

<style lang="scss">
.vf-filter-group-label {
  font-size: 1.2rem;
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
}

</style>