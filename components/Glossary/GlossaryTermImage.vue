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
    <b-img
      class="mt-3 m-img"
      thumbnail
      fluid
      v-show="showImage"
      @load="loadImage"
      :src="image.imageUrl"
      :data-src="image.imageUrl"
      :alt="image.caption"
    >
    </b-img>
    <LoadingSpinner v-show="showImage === false" />
  </div>
</template>

<script>
import LoadingSpinner from "@/components/App/AppLoadingSpinner"

export default {
  name: 'GlossaryTermImage',
  components: {
    LoadingSpinner,
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showImage: false,
    }
  },
  methods: {
    loadImage() {
      this.showImage = true
    }
  },
}
</script>