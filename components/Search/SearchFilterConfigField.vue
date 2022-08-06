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
  <BFormCheckbox
    :checked="facetField.selected"
    @change="onChange(facetField.name)"
  >
    {{ facetField.label }}
  </BFormCheckbox>
</template>

<script>
export default {
  name: "SearchFilterConfigField",
  props: {
    facetField: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checked: false
    }
  },
  watch: {
    facetField: {
      deep: true,
      immediate: true,
      handler(field) {
        this.checked = field.selected
      }
    }
  },
  methods: {
    onChange(field) {
      this.$store.dispatch('search/toggleFilter', field)
    }
  }
}
</script>