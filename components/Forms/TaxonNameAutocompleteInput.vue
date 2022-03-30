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
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <vue-typeahead-bootstrap
      v-model="query"
      id="name"
      :placeholder="placeholder"
      class="mb-12"
      :data="taxonNames"
      :serializer="item => fullNameWithAuthorship(item)"
      :maxMatches="20"
      @hit="onSelected"
      @input="lookupTaxonName"
    >
      <template slot="append">
        <b-button 
          variant="primary" 
          size="sm"
          v-b-modal.taxon-name-modal
        >
          <font-awesome-icon icon="pen-to-square"/>
        </b-button>
        <b-button variant="primary" size="sm">
          <font-awesome-icon icon="plus"/>
        </b-button>
      </template>
    </vue-typeahead-bootstrap>

    <b-modal
      id="taxon-name-modal"
      title="Taxon name"
      size="lg"
    >
      <taxon-name-form :taxonNameProp="selectedTaxonName"/>
    </b-modal>
  </div>
</template>

<script>
import VueTypeaheadBootstrap from "vue-typeahead-bootstrap"
import TaxonNameForm from "@/components/Forms/TaxonNameForm"
import { formControlPropsMixin } from "@/mixins/formMixins"
import { debounce } from "lodash"
import gql from "graphql-tag"

const taxonNameAutoCompleteQuery = gql`query($q: String!) {
  taxonNames: taxonNameAutocomplete(q: $q) {
    id
    fullName
    authorship
  }
}`

export default {
  name: 'TaxonNameAutocompleteInput',
  components: {
    VueTypeaheadBootstrap,
    TaxonNameForm,
  },
  mixins: [
    formControlPropsMixin,
  ],
  data() {
    return {
      query: '',
      taxonNames: [],
      selectedTaxonName: null,
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler() {
        if (this.value) {
          this.query = this.fullNameWithAuthorship(this.value)
          this.selectedTaxonName = this.value
        }
      }
    }
  },
  methods: {
    fullNameWithAuthorship(name) {
      return name.authorship ? name.fullName + ' ' + name.authorship : name.fullName
    },
    lookupTaxonName: debounce(function() {
      this.$apollo.addSmartQuery('taxonNames', {
        query: taxonNameAutoCompleteQuery,
        variables: {
          q: this.query
        },
      })
    }),
    onSelected(event) {
      this.selectedTaxonName = event
      this.$emit('input', event)
    } 
  }
}
</script>