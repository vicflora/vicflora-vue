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
    <b-container>
      <TaxonEditMenu v-if="$store.getters['isLoggedIn']"/>
      <b-row>
        <b-col class="page-header">
          <TaxonName
            v-if="taxonConcept"
            :concept="taxonConcept"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TaxonTabsEdit
            v-if="taxonConcept"
            :concept="taxonConcept"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<router>
{
  path: '/flora/taxon/:id/edit'
}
</router>

<script>
import gql from "graphql-tag"
import TaxonConceptQuery from "@/graphql/queries/taxonConceptQuery"

const TaxonEditMenu = () => import('@/components/Taxon/TaxonEditMenu')
const TaxonName = () => import('@/components/Taxon/TaxonName')
const TaxonTabsEdit = () => import('@/components/Taxon/TaxonTabsEdit.vue')


const updateSolrIndexMutation = gql`mutation UpdateSolrIndexMutation($id: ID!) {
	updateSolrIndex(id: $id) {
    id
  }
}`

export default {
  name: "EditTaxon",
  components: {
    TaxonEditMenu,
    TaxonName,
    TaxonTabsEdit,
  },
  data() {
    return {
      taxonConcept: null,
    }
  },
  apollo: {
    taxonConcept: {
      query: TaxonConceptQuery,
      result({ data, loading }) {
        if (!loading) {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConcept = data.taxonConcept
        }
      },
      skip: true
    }
  },
  beforeCreate() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/')
    }
  },
  created() {
    this.$nuxt.$emit('progress-bar-start')
    this.$apollo.queries.taxonConcept.setVariables({id: this.$route.params.id})
    this.$apollo.queries.taxonConcept.skip = false

    this.$nuxt.$on('taxon-concept-updated', () => {
      this.$apollo.queries.taxonConcept.refetch()
    })

    this.$nuxt.$on('vernacular-names-updated', () => {
      this.$apollo.queries.taxonConcept.refetch()
    })

    this.$nuxt.$on('taxon-reference-added', () => {
      this.$apollo.queries.taxonConcept.refetch()
    })
  },
  beforeDestroy() {
    this.$apollo.mutate({
      mutation: updateSolrIndexMutation,
      variables: {
        id: this.$route.params.id,
      },
    }).then(({data}) => {
      console.log('SOLR index updated: ' + data.updateSolrIndex.id)
    }).catch(error => {
      console.log(error)
    })
  },
}
</script>
