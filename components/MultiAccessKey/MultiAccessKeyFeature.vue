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
    <div class="h3">
      <nuxt-link :to="{
          name: 'multi-access-keys-id',
          params: {
            id: feature.key.id
          }
        }"
      >
        {{ feature.key.title }}
      </nuxt-link>
    </div>
    <h1>{{ feature.name }}</h1>
    <p><b>Type:</b> {{ FeatureTypeEnum[feature.featureType].label }}</p>
    <p v-if="feature.featureType === 'numeric' && feature.unit">
      <b>Unit:</b> {{ feature.unit.name }}
    </p>
    <div 
      v-if="feature.description" 
      v-html="feature.description"
    ></div>
    <div class="text-right">
      <multi-access-key-edit-feature-modal 
        v-if="$store.getters['isLoggedIn']" 
        :feature="feature"
      />
    </div>

    <multi-access-key-feature-states
      v-if="feature.states.length"
      :states="feature.states"
    />
    <PhotoSwipeElement
      ref="photoswipe2"
      :items="photoSwipeItems"
    />
  </div>
</template>

<script>
import FeatureTypeEnum from "~/graphql/enums/FeatureTypeEnum"

const MultiAccessKeyFeatureStates = () => 
    import('@/components/MultiAccessKey/MultiAccessKeyFeatureStates')
const PhotoSwipeElement = () => 
    import("@/components/App/AppPhotoSwipeElement")
const MultiAccessKeyEditFeatureModal = () => 
    import('@/components/MultiAccessKey/MultiAccessKeyEditFeatureModal')

export default {
  name: 'MultiAccessKeyFeature',
  components: {
    MultiAccessKeyFeatureStates,
    PhotoSwipeElement,
    MultiAccessKeyEditFeatureModal,
  },
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      FeatureTypeEnum
    }
  },
  computed: {
    photoSwipeItems() {
      if (this.feature.states.length) {
        const images = []
        this.feature.states.forEach(state => {
          if (state.images.length > 0) {
            state.images.forEach(image => {
              images.push(image)
            })
          }
        })

        if (images.length > 0) {
          return images.map(item => this.createPhotoSwipeItem(item))
        }
        else {
          return []
        }
      }
      return null
    }
  },
  created() {
    this.$nuxt.$on('image-thumbnail-clicked', (index) => {
      this.$refs.photoswipe2.open(index)
    })
  },
  mounted() {
    if (this.feature.states.length) {
      let index = 0
      const images = []
      this.feature.states.forEach(state => {
        if (state.images.length > 0) {
          state.images.forEach(image => {
            image.index = index++
            image.caption = '<p style="font-weight:bold">' + this.feature.name + ': <span style="color: red">' + state.name + '</span></p>' + image.caption
            images.push(image)
          })
        }
      })
    }
  },
  destroyed() {
    this.$nuxt.$off('image-thumbnail-clicked')
  },
  methods: {
    createPhotoSwipeItem(image) {
      let item = {}
      item.preview1024 = {
        src: image.previewUrl,
        w: Math.floor(image.w/2),
        h: Math.floor(image.h/2),
      }
      item.preview2048 = {
        src: image.previewUrl.replace('maxsize=1024', 'maxsize=2048'),
        w: image.w,
        h: image.h,
      }
      item.title = image.caption
      return item
    },

  }
}
</script>