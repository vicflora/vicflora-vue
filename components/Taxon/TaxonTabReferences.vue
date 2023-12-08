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
  <div class="vf-taxon-concept-references">
    <div
      v-for="ref in concept.references"
      :key="ref.id"
      v-html="ref.reference.referenceStringHtml"
    />
  </div>
</template>

<script>
export default {
  name: 'TaxonTabReferences',
  props: {
    concept: {
      type: Object,
      required: true,
    },
  },
}
</script>
