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
            id: character.key.id
          }
        }"
      >
        {{ character.key.title }}
      </nuxt-link>
    </div>
    <h1>{{ character.name }}</h1>
    <div class="select-character">
      <multi-access-key-character-select
        :keyId="character.key.id"
        :characterId="character.id"
      />
    </div>
    <p><b>Type:</b> {{ CharacterTypeEnum[character.characterType].label }}</p>
    <p v-if="character.characterType === 'numeric' && character.unit">
      <b>Unit:</b> {{ character.unit.name }}
    </p>
    <div 
      v-if="character.description" 
      v-html="character.description"
    ></div>
    <div class="text-right">
      <multi-access-key-edit-character-modal 
        v-if="$store.getters['isLoggedIn']" 
        :character="character"
      />
    </div>

    <multi-access-key-character-states
      v-if="character.states.length"
      :states="character.states"
    />
    <PhotoSwipeElement
      ref="photoswipe2"
      :items="photoSwipeItems"
    />
  </div>
</template>

<script>
import CharacterTypeEnum from "~/graphql/enums/CharacterTypeEnum"

const MultiAccessKeyCharacterSelect = () => 
    import('@/components/MultiAccessKey/MultiAccessKeyCharacterSelect.vue')
const MultiAccessKeyCharacterStates = () => 
    import('@/components/MultiAccessKey/MultiAccessKeyCharacterStates')
const PhotoSwipeElement = () => 
    import("@/components/App/AppPhotoSwipeElement")
const MultiAccessKeyEditCharacterModal = () => 
    import('@/components/MultiAccessKey/MultiAccessKeyEditCharacterModal')

export default {
  name: 'MultiAccessKeyCharacter',
  components: {
    MultiAccessKeyCharacterSelect,
    MultiAccessKeyCharacterStates,
    PhotoSwipeElement,
    MultiAccessKeyEditCharacterModal,
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      CharacterTypeEnum
    }
  },
  computed: {
    photoSwipeItems() {
      if (this.character.states.length) {
        const images = []
        this.character.states.forEach(state => {
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
    if (this.character.states.length) {
      let index = 0
      const images = []
      this.character.states.forEach(state => {
        if (state.images.length > 0) {
          state.images.forEach(image => {
            image.index = index++
            image.caption = '<p style="font-weight:bold">' + this.character.name + ': <span style="color: red">' + state.name + '</span></p>' + image.caption
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

<style lang="scss">
.select-character {
  margin-bottom: 1rem;
}
</style>