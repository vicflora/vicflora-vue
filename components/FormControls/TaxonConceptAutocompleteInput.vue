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
    <div 
      v-if="show"
      class="form-group"
    >
      <label :for="name">{{ label }}</label>
      <vue-typeahead-bootstrap
        v-model="query"
        id="name"
        :placeholder="placeholder"
        class="mb-12"
        :data="taxonConcepts"
        :serializer="item => fullNameWithAuthorship(item)"
        :maxMatches="20"
        @hit="onSelected"
        @input="lookupTaxonConcept"
      />
      <small 
        v-if="description"
        class="vf-form-control-description"
      >{{ description }}</small>
    </div>
  </div>
</template>

<script>
import VueTypeaheadBootstrap from "vue-typeahead-bootstrap"
import { formControlPropsMixin } from "@/mixins/formMixins"
import { debounce } from "lodash"
import gql from "graphql-tag"

const taxonConceptAutoCompleteQuery = gql`query taxonConceptAutocomplete($q: String!) {
  taxonConcepts: taxonConceptAutocomplete(q: $q) {
    id
    taxonName {
      fullName
      authorship
    }
  }
}`

export default {
  name: 'TaxonConceptAutocompleteInput',
  components: {
    VueTypeaheadBootstrap,
  },
  mixins: [
    formControlPropsMixin,
  ],
  data() {
    return {
      query: '',
      taxonConcepts: [],
      selectedTaxonConcept: null,
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler() {
        if (this.value) {
          this.query = this.fullNameWithAuthorship(this.value)
          this.selectedTaxonConcept = this.value
        }
      }
    }
  },
  methods: {
    fullNameWithAuthorship(concept) {
      return concept.taxonName.authorship 
          ? concept.taxonName.fullName + ' ' + concept.taxonName.authorship 
          : concept.taxonName.fullName
    },
    lookupTaxonConcept: debounce(function() {
      this.$apollo.addSmartQuery('taxonConcepts', {
        query: taxonConceptAutoCompleteQuery,
        variables: {
          q: this.query
        },
      })
    }),
    onSelected(event) {
      this.selectedTaxonConcept = event
      this.$emit('input', event)
    } 
  }
}
</script>