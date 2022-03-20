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
  <b-row>
    <b-col>
      <span class="m-relationship-type-name">
          {{relationship.relationshipType.name}}
      </span>
    </b-col>

    <b-col>
      <nuxt-link :to="`?name=${relationship.relatedTerm.name}`">
          {{relationship.relatedTerm.name}}
      </nuxt-link>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'GlossaryTermRelationship',
  props: {
    relationship: {
      type: Object,
      required: true,
    },
  },
}
</script>