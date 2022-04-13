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
      :to="{name: 'admin-edit', params: { id: $route.params.id } }"
    ><FontAwesomeIcon icon="pen-to-square"/> Edit</b-button>
    <b-button 
      v-if="showEditProfile"
      variant="primary"
      size="sm"
      :to="{name: 'admin-edit-profile', params: { id: $route.params.id } }"
    ><FontAwesomeIcon icon="file-pen"/> Edit profile</b-button>
    <b-button 
      v-if="showEditDistribution"
      variant="primary"
      size="sm"
      :to="{name: 'admin-edit-distribution', params: { id: $route.params.id } }"
    ><FontAwesomeIcon icon="map-location"/> Edit distribution</b-button>
    <b-button 
      v-if="showAddChild"
      variant="primary"
      size="sm"
      :to="{name: 'admin-add-child', params: { id: $route.params.id } }"
    ><FontAwesomeIcon icon="child"/> Add child</b-button>
    <taxon-edit-modal />
  </div>
</template>

<script>
import TaxonEditModal from '@/components/Taxon/TaxonEditModal.vue'

export default {
  name: 'TaxonEditMenu',
  components: { 
    TaxonEditModal,
  },
  data() {
    return {
      showView: false,
      showEdit: false,
      showEditProfile: false,
      showEditDistribution: false,
      showAddChild: false,
    }
  },
  created() {
    switch (this.$route.name) {
      case 'flora-taxon-id':
        this.showEdit = true
        this.showAddChild = true
        break;
    
      case 'admin-edit':
        this.showView = true
        this.showEditProfile = true
        this.showEditDistribution = true
        break;

      case 'admin-edit-profile':
        this.showView = true
        this.showEdit = true
        this.showEditDistribution = true
        break;

      case 'admin-edit-distribution':
        this.showView = true
        this.showEdit = true
        this.showEditProfile = true
        break;

      case 'admin-add-child':
        this.showView = true
        break;
    
      default:
        break;
    }
  }
}
</script>