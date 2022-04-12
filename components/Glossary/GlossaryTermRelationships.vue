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
    <h5>Relationships</h5>
    <GlossaryTermRelationship 
        v-for="relationship in relationships"
        :key="relationship.id"
        :relationship="relationship"
    />
  </div>
</template>

<script>
const GlossaryTermRelationship = () => import("@/components/Glossary/GlossaryTermRelationship")

export default {
  name: 'GlossaryTermRelationships',
  components: {
    GlossaryTermRelationship,
  },
  props: {
    relationships: {
      type: Array,
      required: true,
    },
  },
}
</script>