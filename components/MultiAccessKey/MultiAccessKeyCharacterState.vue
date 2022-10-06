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
  <div class="multi-access-key-state">
    <h3>
      {{ state.name }}
    </h3>
    <div 
      v-if="state.description"
      v-html="state.description"
    ></div>

    <multi-access-key-character-state-images
      v-if="state.images.length > 0"
      :images="state.images"
    />

    <div class="text-right">
      <multi-access-key-edit-state-modal 
        v-if="$store.getters['isLoggedIn']" 
        :state="state"
      />
    </div>
  </div>
</template>

<script>
const MultiAccessKeyCharacterStateImages = 
    () => import('@/components/MultiAccessKey/MultiAccessKeyCharacterStateImages')
const MultiAccessKeyEditStateModal =
    () => import('@/components/MultiAccessKey/MultiAccessKeyEditStateModal')

export default {
  name: 'MultiAccessKeyCharacterState',
  components: {
    MultiAccessKeyCharacterStateImages,
    MultiAccessKeyEditStateModal,
  },
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.multi-access-key-state {
  margin-bottom: 1rem;
}
</style>