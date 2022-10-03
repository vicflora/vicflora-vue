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
    <h2>Features</h2>
    <ul v-if="groups">
      <li v-for="group in groups" :key="group.id">
        <!-- <nuxt-link :to="`/multi-access-keys/features/${group.id}`"> -->
          {{ group.name }}
        <!-- </nuxt-link> -->
        <ul>
          <multi-access-key-feature-list-item
            v-for="feature in group.children"
            :key="feature.id"  
            :feature="feature"
          />
        </ul>
      </li>
    </ul>
    <ul v-else>
      <multi-access-key-feature-list-item
        v-for="feature in multiAccessKey.features"
        :key="feature.id"  
        :feature="feature"
      />
    </ul>
  </div>
</template>

<script>
const MultiAccessKeyFeatureListItem = () => 
    import('@/components/MultiAccessKey/MultiAccessKeyFeatureListItem')

export default {
  name: 'MultiAccessKeyFeatureList',
  components: {
    MultiAccessKeyFeatureListItem,
  },
  props: {
    multiAccessKey: {
      type: Object,
      required: true,
    },
  },
  computed: {
    groups() {
      if (this.multiAccessKey.featureGroups.length) {
        const groups = []
        this.multiAccessKey.featureGroups.forEach(item => {
          const group = item
          group.children = item.children.map(child => {
            return this.multiAccessKey.features.filter(feature => {
              return feature.id === child.id
            })[0]
          })
          groups.push(group)
        })
        return groups
      }
      return null
    }
  },
}
</script>