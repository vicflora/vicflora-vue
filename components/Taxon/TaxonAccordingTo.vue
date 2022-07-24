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
    <b>According to:</b> <span id="according-to-popover-target">{{ accordingTo.quickRef }}</span>
  <b-popover target="according-to-popover-target" triggers="hover" placement="bottomright">
    <div v-html="accordingTo.citationHtml"></div>
  </b-popover>

  </div>
</template>

<script>
export default {
  name: "TaxonAccordingTo",
  props: {
    accordingTo: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style lang="scss">
#according-to-popover-target {
  cursor: default;
}

.according-to-tooltip .tooltip-inner p {
  font-weight: normal;
}
</style>