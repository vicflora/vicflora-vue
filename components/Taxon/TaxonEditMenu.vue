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
  <div class="taxon-edit-menu text-right">
    <b-button
      v-if="showView"
      variant="primary"
      size="sm"
      :to="{name: 'flora-taxon-id', params: { id: $route.params.id } }"
    ><FontAwesomeIcon icon="eye"/> View</b-button>
    <b-button
      v-if="showEdit"
      variant="primary"
      size="sm"
      :to="{name: 'flora-taxon-edit', params: { id: $route.params.id } }"
    ><FontAwesomeIcon icon="pen-to-square"/> Edit</b-button>
    <b-button
      v-if="showAddChild"
      variant="primary"
      size="sm"
      :to="{name: 'flora-taxon-add-child', params: { id: $route.params.id } }"
    ><FontAwesomeIcon icon="child"/> Add child</b-button>
    <b-button
      v-if="showRefetchData"
      variant="primary"
      size="sm"
      @click="$nuxt.$emit('refetch-data-button-clicked')"
    ><FontAwesomeIcon icon="rotate"/> Refetch data</b-button>
  </div>
</template>

<script>

export default {
  name: 'TaxonEditMenu',
  data() {
    return {
      showView: false,
      showEdit: false,
      showAddChild: false,
      showRefetchData: false,
    }
  },
  created() {
    switch (this.$route.name) {
      case 'flora-taxon-id':
        this.showEdit = true
        this.showAddChild = true
        this.showRefetchData = true
        break;

      case 'flora-taxon-edit':
        this.showView = true
        break;

      case 'flora-taxon-add-child':
        this.showView = true
        break;

      default:
        break;
    }
  }
}
</script>
