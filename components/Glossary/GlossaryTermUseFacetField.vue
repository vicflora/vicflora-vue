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
  <b-tab :title="`${ label } (${ facets.length })`">
    <b-card-text>
      <div class="overflow-auto">
        <div id="facetList">
          <div v-for="facet in facetsForPage" :key="facet.value">
            {{ facet.value }} ({{ facet.count }})
            <nuxt-link :to="{path: '/flora/search', query: { q: `description:${term}*`, fq: facet.fq } }"><b-icon icon="search"/></nuxt-link>
          </div>
        </div>

        <b-pagination
          v-model="currentPage"
          v-if="facets.length > perPage"
          :total-rows="facets.length"
          :per-page="perPage"
          aria-controls="facetList"
        ></b-pagination>
      </div>
    </b-card-text>
  </b-tab>
</template>

<script>
export default {
  name: 'GlossaryTermUseFacetField',
  props: {
    field: {
      type: Object,
      required: true,
    },
    term: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      labels: {
        family: 'Families',
        genus: 'Genera',
        species: 'Species',
      },
      perPage: 10,
      currentPage: 1,
    }
  },
  computed: {
    facets() {
      return this.field.facets.filter(facet => {
        return facet.value !== '(blank)'
      })
    },
    label() {
      return this.labels[this.field.fieldName]
    },
    facetsForPage() {
      if (this.facets){
        return this.facets.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage,)
      }
    }
  }
}
</script>