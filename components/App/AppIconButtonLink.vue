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
  <b-btn 
    :to="to" 
    :variant="variant"
    class="vf-icon-button"
  >
    <span class="vf-icon-button-icon"><b-icon :icon="icon" font-scale="1"/></span>
    <span class="vf-icon-button-text">{{ text }}</span>
  </b-btn>
</template>

<script>
import { BIcon, BIconInfoCircle, BIconPlayBtn } from "bootstrap-vue"

export default {
  name: 'AppIconButtonLink',
  components: {
    BIcon,
    BIconInfoCircle,
    BIconPlayBtn,
  },
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'outline-primary',
    },
  },
}
</script>