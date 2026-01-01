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
    <LoadingSpinner v-show="showImage === false" />
    <figure>
      <b-img
        class="mt-3 m-img"
        thumbnail
        fluid
        v-show="showImage"
        @load="loadImage"
        :src="image.previewUrl"
        :data-src="image.previewUrl"
        :alt="image.caption"
      >
      </b-img>
      <figcaption 
        v-show="showImage"
        v-html="caption"
      ></figcaption>
    </figure>
  </div>
</template>

<script>
const LoadingSpinner = () => import("@/components/App/AppLoadingSpinner")

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
  computed: {
    caption() {
      const title = this.image.title.substring(this.image.title.indexOf('fig.')).replace('fig.', 'Figure').trim()
      return `<b>${title}</b> ${this.image.caption} Source: ${this.image.source} 
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>`
    }
  },
  methods: {
    loadImage() {
      this.showImage = true
    }
  },
}
</script>