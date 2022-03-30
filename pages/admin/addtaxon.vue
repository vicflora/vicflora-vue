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
      <b-row>
        <b-col>
          <header>
            <h1>New taxon concept</h1>
          </header>
          <taxon-concept-form/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TaxonConceptForm from '../../components/Forms/TaxonConceptForm.vue'
export default {
  components: { TaxonConceptForm },
  name: "AddTaxonConcept",

}
</script>