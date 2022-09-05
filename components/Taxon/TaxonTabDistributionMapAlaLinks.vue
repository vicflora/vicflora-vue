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
  <l-control position="bottomleft" >
    <b-button
      variant="primary"
      :href="`https://avh.ala.org.au/occurrences/search?taxa=${alaQueryString}`"
      :title="`Find ${taxonConcept.taxonName.fullName} in AVH`"
      target="_blank"
    >
      <b-icon-search/> AVH
    </b-button>
    <b-button
      variant="primary"
      :href="`https://biocache.ala.org.au/occurrences/search?taxa=${alaQueryString}&fq=data_resource_uid:dr1097`"
      :title="`Find ${taxonConcept.taxonName.fullName} in the Victorian Biodiversity Atlas`"
      target="_blank"
    >
      <b-icon-search/> VBA
    </b-button>
  </l-control>
</template>

<script>
export default {
  name: "TaxonTabDistributionMapAlaLinks",
  props: {
    taxonConcept: {
      type: Object,
      required: true,
    },
  },
  computed: {
    alaQueryString() {
      return this.taxonConcept.taxonName.fullName.replaceAll(' ', '+')
    },
  },
}
</script>