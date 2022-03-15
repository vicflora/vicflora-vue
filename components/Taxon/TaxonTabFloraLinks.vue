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
  <div class="vf-taxon_concept-flora-links">
    <b-row v-if="links">
      <b-col 
        v-for="link in links"
        :key="link.id"
        lg="6"
        class="vf-taxon-concept-flora-link"
      >
        <img 
          :src="require(`@/assets/images/flora-icons/${link.icon}`)"
          alt=""
          class="vf-vf-taxon-concept-flora-link-icon"
        />
        <a 
          :href="link.url"
          target="_blank"
        >{{ link.flora }} <small><BIconBoxArrowUpRight/></small></a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'TaxonTabFloraLinks',
  props: {
    concept: {
      type: Object,
      required: true,
    },
  },
  computed: {
    links() {
      if (this.concept.floraLinks) {
        return this.concept.floraLinks.sort((a, b) => {
          return a.sortOrder - b.sortOrder
        })
      }
      return null
    }
  }
}
</script>

<style lang="scss">
.vf-taxon_concept-flora-links ul {
  padding-left: 0;
}

.vf-taxon-concept-flora-link {
  list-style-type: none;
  margin-bottom: 0.5rem;

  img {
    max-height: 80px;
    border: solid 1px #cccccc;
    border-radius: 4px;
    margin-right: 1rem;
  }
}
</style>