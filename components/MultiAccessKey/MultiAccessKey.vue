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
  <div class="multi-access-key">
    <div class="h3">
      <nuxt-link :to="{name: 'multi-access-keys'}">Multi-access keys</nuxt-link>
    </div>
    <h1>{{ multiAccessKey.title }}</h1>
    <div 
      v-if="multiAccessKey.description" 
      v-html="multiAccessKey.description"
    ></div>
    <div class="text-right">
      <multi-access-key-edit-key-modal 
        v-if="$store.getters['isLoggedIn']"
        :multiAccessKey="multiAccessKey"
      />
    </div>

    <multi-access-key-feature-list
      v-if="multiAccessKey.features.length"
      :multiAccessKey="multiAccessKey"
    />
  </div>
</template>

<script>
const MultiAccessKeyFeatureList = () =>
    import('@/components/MultiAccessKey/MultiAccessKeyFeatureList')
const MultiAccessKeyEditKeyModal =
    () => import('@/components/MultiAccessKey/MultiAccessKeyEditKeyModal')

export default {
  name: 'MultiAccessKey',
  components: {
    MultiAccessKeyFeatureList,
    MultiAccessKeyEditKeyModal,
  },
  props: {
    multiAccessKey: {
      type: Object,
      required: true,
    },
  },
}
</script>