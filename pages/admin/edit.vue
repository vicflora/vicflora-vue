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
      <taxon-edit-menu
        v-if="$store.getters['isLoggedIn']"
      />
      <b-row>
        <b-col>
          <header class="page-header">
            <h2 :class="classes">{{ taxonConceptLabel }}</h2>
          </header>
          <taxon-concept-form/>
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
const TaxonEditMenu = () => import('@/components/Taxon/TaxonEditMenu')
const TaxonConceptForm = () => import('@/components/Forms/TaxonConceptForm.vue')



export default {
  name: "EditTaxon",
  components: { 
    TaxonEditMenu,
    TaxonConceptForm, 
  },
  data() {
    return {
      taxonConceptLabel: null,
      classes: ['m-taxon-name'],
    }
  },
  created() {
    this.$nuxt.$on('taxon-concept-label-changed', (label) => {
      this.taxonConceptLabel = label
    })
  }
}
</script>
