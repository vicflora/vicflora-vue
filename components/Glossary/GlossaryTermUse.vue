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
  <div class="vf-glosary-term-use">
    <div v-if="findUses">
      <h5>Use in VicFlora</h5>
      <div v-if="search">
      <div>
        <b-card no-body>
          <b-tabs pills card>
            <GlossaryTermUseFacetField 
              v-for="field in search.facetFields"
              :key="field.fieldName"
              :field="field"
              :term="term"
            />
          </b-tabs>
        </b-card>
      </div>
      </div>
    </div>
    <div v-else>
      <b-button
        variant="outline-primary"
        @click="onButtonClick"
      >Find uses in VicFlora <b-icon icon="search" font-scale="2"/></b-button>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconSearch } from "bootstrap-vue"
import GlossaryTermUseFacetField from "@/components/Glossary/GlossaryTermUseFacetField"
import searchGlossaryTermQuery from "@/graphql/queries/searchGlossaryTermQuery"

export default {
  name: 'GlossaryTermUse',
  components: {
    BIcon,
    BIconSearch,
    GlossaryTermUseFacetField,
  },
  props: {
    term: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      findUses: false,
      searchInput: {
        q: "description:*",
        facetField: [
          "family",
          "genus",
          "species"
        ],
        rows: 0,
        facetLimit: -1,
        facetSort: 'count',
      },
      search: null,
    }
  },
  apollo: {
    search: {
      query: searchGlossaryTermQuery,
      skip: true,
    },
  },
  watch: {
    findUses: {
      immediate: true,
      handler() {
        if (this.findUses) {
          this.$apollo.queries.search.setVariables({
            input: this.searchInput
          })
          this.$apollo.queries.search.skip = false
        }
      }
    },
    term: {
      immediate: true,
      handler(term) {
        if (term) {
          this.searchInput.q = `description:${term}*`
          if (this.search) {
            this.$apollo.queries.search.refetch({
              input: this.searchInput
            })
          }
        }
      }
    }
  },
  created() {
  },
  methods: {
    onButtonClick() {
      this.findUses = true
    }
  },
}
</script>