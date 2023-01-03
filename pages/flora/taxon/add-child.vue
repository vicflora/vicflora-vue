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
            <h2 :class="classes">Add child: {{ taxonConceptLabel }}</h2>
          </header>
          <new-taxon-concept-form
            v-if="newTaxonConcept && defaultPublicationStatus"
            :key="newTaxonConcept.parent.id"
            :id="'taxon-concept-create'"
            :taxonConcept="newTaxonConcept"
            :defaultPublicationStatus="defaultPublicationStatus"
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
const NewTaxonConceptForm = () => import('@/components/Forms/NewTaxonConceptForm.vue')

import TaxonConceptQuery from "@/graphql/queries/taxonConceptQuery"

export default {
  name: 'AddChild',
  components: {
    TaxonEditMenu,
    NewTaxonConceptForm,
  },
  data() {
    return {
      parent: null,
      taxonConcept: null,
      newTaxonConcept: null,
      taxonConceptLabel: null,
      classes: ['m-taxon-name'],
    }
  },
  apollo: {
    taxonConcept: {
      query: TaxonConceptQuery,
      result({ data, loading }) {
        if (!loading) {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConcept = data.taxonConcept
          this.newTaxonConcept = new TaxonConcept()
          this.newTaxonConcept.parent = new TaxonConcept(data.taxonConcept)
        }
      },
      skip: true
    },
  },
  computed: {
    defaultPublicationStatus() {
      if (this.$store.getters.user.preferences) {
       return this.$store.getters.user.preferences.defaultPublicationStatus
      }
    }
  },
  created() {
    this.$nuxt.$emit('progress-bar-start')
    this.$apollo.queries.taxonConcept.setVariables({id: this.$route.params.id})
    this.$apollo.queries.taxonConcept.skip = false

    this.$nuxt.$on('taxon-concept-label-changed', (label) => {
      this.taxonConceptLabel = label
    })

    this.$nuxt.$on('new-taxon-concept-created', () => {
      this.$apollo.queries.taxonConcept.refetch({id: this.$route.params.id})
    })
  },
}
</script>

