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
  <div class="natural-region-map-image">
    <img 
      :alt="alt" 
      :src="src" 
    />
  </div>
</template>

<script>
export default {
  name: 'NaturalRegionMapImage',
  props: {
    alt: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@media (min-width: 768px) { 
  #content .natural-region-map-image { 
    float: left;
    margin-right: 1rem;
    img {
      max-width: 400px;
    }
  }
}
</style>