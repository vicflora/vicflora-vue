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
    <h2>Characters</h2>
    <ul 
      v-if="groups"
      class="character-list"
    >
      <li 
        v-for="group in groups" 
        :key="group.id"
        class="character-list-group"
      >
        <span class="character-list-group-label">
          {{ group.name }}
        </span>
        <ul>
          <multi-access-key-character-list-item
            v-for="character in group.children"
            :key="character.id"  
            :character="character"
          />
        </ul>
      </li>
    </ul>
    <ul 
      v-else
      class="character-list"
    >
      <multi-access-key-character-list-item
        v-for="character in multiAccessKey.characters"
        :key="character.id"  
        :character="character"
      />
    </ul>
  </div>
</template>

<script>
const MultiAccessKeyCharacterListItem = () => 
    import('@/components/MultiAccessKey/MultiAccessKeyCharacterListItem')

export default {
  name: 'MultiAccessKeyCharacterList',
  components: {
    MultiAccessKeyCharacterListItem,
  },
  props: {
    multiAccessKey: {
      type: Object,
      required: true,
    },
  },
  computed: {
    groups() {
      if (this.multiAccessKey.characterGroups.length) {
        const groups = []
        this.multiAccessKey.characterGroups.forEach(item => {
          const group = item
          group.children = item.children.map(child => {
            return this.multiAccessKey.characters.filter(character => {
              return character.id === child.id
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