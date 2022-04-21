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
  <b-container>
    <TaxonEditMenu v-if="$store.getters['isLoggedIn']"/>
    <b-row>
      <b-col>
          <header class="page-header">
            <h2 :class="classes">Edit: {{ taxonConceptLabel }}</h2>
          </header>
          <taxon-concept-form 
            v-if="taxonConcept"
            :id="'taxon-concept-create'"
            :taxonConcept="taxonConcept"
          />
      </b-col>
    </b-row>
  </b-container>
</template>

<router>
{
  path: '/flora/taxon/:id/add-child'
}
</router>

<script>
import { TaxonConcept } from '@/models/TaxonConceptModel'
const TaxonEditMenu = () => import('@/components/Taxon/TaxonEditMenu')
const TaxonConceptForm = () => import('@/components/Forms/TaxonConceptForm.vue')

import gql from "graphql-tag"
const taxonConceptParentQuery = gql`query ($id: ID!) {
  parent: taxonConcept(id: $id) {
    id
    taxonName {
      id
      fullName
      authorship
    }
  }
}`

export default {
  name: 'AddChild',
  components: {
    TaxonEditMenu,
    TaxonConceptForm,
  },
  data() {
    return {
      parent: null,
      taxonConcept: null,
      taxonConceptLabel: null,
      classes: ['m-taxon-name'],
    }
  },
  apollo: {
    parent: {
      query: taxonConceptParentQuery,
      result({ data, loading }) {
        if (!loading) {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConcept = new TaxonConcept()
          this.taxonConcept.parent = new TaxonConcept(data.parent)
        }
      },
      skip: true,
    }
  },
  created() {
    this.$nuxt.$emit('progress-bar-start')
    this.$apollo.queries.parent.setVariables({id: this.$route.params.id})
    this.$apollo.queries.parent.skip = false

    this.$nuxt.$on('taxon-concept-label-changed', (label) => {
      this.taxonConceptLabel = label
    })
  },
}
</script>

