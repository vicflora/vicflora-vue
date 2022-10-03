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
      @click="$bvModal.show(`modal-feature-${feature.id}`)"
    >
      <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
    </b-button>

    <b-modal 
      :id="`modal-feature-${feature.id}`" 
      title="Edit multi-access key feature"
      :ok-disabled="okDisabled"
      @ok="handleOk"
    >
      <multi-access-key-edit-form :form="feature"/>
    </b-modal>
  </div>
</template>

<script>
import UpdateMultiAccessKeyFeatureMutation 
    from '@/graphql/mutations/UpdateMultiAccessKeyFeatureMutation'

const MultiAccessKeyEditForm = 
    () => import('@/components/MultiAccessKey/MultiAccessKeyEditForm')

export default {
  name: 'MultiAccessKeyEditFeatureModal',
  components: {
    MultiAccessKeyEditForm,
  },
  props: {
    feature: {
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
        mutation: UpdateMultiAccessKeyFeatureMutation,
        variables: {
          input: {
            id: this.feature.id,
            name: this.feature.name,
            featureType: this.feature.featureType,
            description: this.feature.description,
          },
        },
      }).then(({ data }) => {
        console.log(JSON.stringify(data, null, 2))
      })
    }
  }
}
</script>



