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
      <b-row>
        <b-col>
          <header>
            <code v-if="taxonConcept">{{ taxonConcept.id }}</code>
          </header>
          <taxon-concept-form :value="taxonConcept"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from "graphql-tag"
import TaxonConceptForm from '@/components/Forms/TaxonConceptForm.vue'


export default {
  components: { 
    TaxonConceptForm, 
  },
  name: "EditTaxon",
  data() {
    return {
      taxonConcept: null,
    }
  },
  apollo: {
    taxonConcept: {
      query: gql`query taxonEditFormQuery($id: ID!) {
        taxonConcept(id: $id) {
          id
          taxonName {
            id
            fullName
            authorship
          }
          taxonRank
          taxonomicStatus
          occurrenceStatus
          establishmentMeans
          degreeOfEstablishment
          parent {
            id
            taxonName {
              id
              fullName
              authorship
            }
          }
          acceptedConcept {
            id
            taxonName {
              id
              fullName
              authorship
            }
          }
        }
      }`,
      result({ data, loading }) {
        if (!loading) {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConcept = data.taxonConcept
        }
      },
      skip: true
    }
  },
  created() {
    this.$nuxt.$emit('progress-bar-start')
    this.$apollo.queries.taxonConcept.setVariables({id: this.$route.params.id})
    this.$apollo.queries.taxonConcept.skip = false

  },
}
</script>
