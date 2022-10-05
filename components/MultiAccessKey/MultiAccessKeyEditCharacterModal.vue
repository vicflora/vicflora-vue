<!-- 
// Copyright 2022 Royal Botanic Gardens Board
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License. 
-->

<template>
  <div>
    <b-button 
      variant="primary"
      @click="$bvModal.show(`modal-character-${character.id}`)"
    >
      <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
    </b-button>

    <b-modal 
      :id="`modal-character-${character.id}`" 
      title="Edit multi-access key character"
      :ok-disabled="okDisabled"
      @ok="handleOk"
    >
      <multi-access-key-edit-form :form="character"/>
    </b-modal>
  </div>
</template>

<script>
import UpdateMultiAccessKeyCharacterMutation 
    from '@/graphql/mutations/UpdateMultiAccessKeyCharacterMutation'

const MultiAccessKeyEditForm = 
    () => import('@/components/MultiAccessKey/MultiAccessKeyEditForm')

export default {
  name: 'MultiAccessKeyEditCharacterModal',
  components: {
    MultiAccessKeyEditForm,
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      okDisabled: true
    }
  },
  created() {
    this.$nuxt.$on('multi-access-edit-form-input', () => {
      this.okDisabled = false
    })
  },
  destroyed() {
    this.$nuxt.$off('multi-access-edit-form-input')
  },
  methods: {
    handleOk() {
      this.$apollo.mutate({
        mutation: UpdateMultiAccessKeyCharacterMutation,
        variables: {
          input: {
            id: this.character.id,
            name: this.character.name,
            characterType: this.character.characterType,
            description: this.character.description,
          },
        },
      }).then(({ data }) => {
        console.log(JSON.stringify(data, null, 2))
      })
    }
  }
}
</script>



