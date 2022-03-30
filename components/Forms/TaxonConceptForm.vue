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
  <div class="taxon-concept-form">
    <taxon-concept-form-generator 
      :schema="schema"
      :value="formData"
    />
  </div>
</template>

<script>
import schema from "@/config/taxonConceptFormSchema"
import TaxonConcept from "@/models/TaxonConceptModel"
import TaxonConceptFormGenerator from '@/components/Forms/TaxonConceptFormGenerator'

export default {
  name: "TaxonConceptForm",
  components: {
    TaxonConceptFormGenerator,
  },
  props: {
    value: {
      type: Object,
      required: false,
    },
  },
  computed: {
    formData() {
      return new TaxonConcept(this.value || {})
    },
    schema() {
      return schema
    }
  }

}
</script>