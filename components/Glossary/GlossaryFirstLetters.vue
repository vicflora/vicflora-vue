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
  <div class="vf-glossary-first-letters" >
    <nuxt-link
      v-for="letter in letters"
      :key="letter.charCodeAt(0)"
      :to="`/flora/glossary?name=${letter}`"    
      ><span class="letter" :class="classes(letter)">{{ letter }}</span>
    </nuxt-link>
  </div>
</template>

<script>
import glossaryFirstLettersQuery from "@/graphql/queries/glossaryFirstLettersQuery"

export default {
  name: 'GlossaryFirstLetters',
  data() {
    return {
      letters: [],
      firstLetter: 'A',
    }
  },
  apollo: {
    letters: {
      query: glossaryFirstLettersQuery,
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
      }
    }
  },
  created() {
    this.$apollo.queries.letters.skip = false
  },
  methods: {
    classes(letter) {
      return {
        active: letter === this.firstLetter
      }
    }
  }
}
</script>