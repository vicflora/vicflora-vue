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
    <ul 
      v-if="terms"
      class="vf-glossary-term-list"
    >
      <li 
        v-for="term in terms" 
        :key="term.id"
      >
        <nuxt-link 
          :to="`/flora/glossary?name=${term.name}`"
          :class="classes(term.name)"
        >
          {{ term.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import glossaryTermsByFirstLetterQuery from "@/graphql/queries/glossaryTermsByFirstLetterQuery"

export default {
  name: 'GlossaryTermList',
  data() {
    return {
      firstLetter: 'A',
      activeTerm: 'abaxial',
      terms: []
    }
  },
  apollo: {
    terms: {
      query: glossaryTermsByFirstLetterQuery,
      variables() {
        return {
          firstLetter: this.firstLetter,
        }
      },
      skip: true,
    },
  },
  watch: {
    '$route.query.name': {
      immediate: true,
      deep: true,
      handler(name) {
        if (name && name[0].toLowerCase() !== this.firstLetter.toLowerCase()) {
          this.firstLetter = name[0].toUpperCase()
        }
        if (name && name.toLowerCase() !== this.activeTerm.toLowerCase()) {
          this.activeTerm = name.toLowerCase()
        }
      },
    },
    terms: {
      immediate: true,
      deep: true,
      handler() {
        if (this.activeTerm.length === 1) {
          this.$router.push({
            query: {
              name: this.terms[0].name
            }
          })
        }
      }
    }
  },
  created() {
    this.$apollo.queries.terms.skip = false
  },
  methods: {
    classes(term) {
      return {
        active: this.activeTerm && term.toLowerCase() === this.activeTerm.toLowerCase()
      }
    }
  }
}
</script>