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
  <b-form-select 
    v-model="selected" 
    :options="options"
    size="sm"
    @change="onChange"
  ></b-form-select>
</template>

<script>
import MultiAccessKeyQuery from '@/graphql/queries/MultiAccessKeyQuery'

export default {
  name: 'MultiAccessKeyFeatureSelect',
  props: {
    keyId: {
      type: String,
      required: true,
    },
    featureId: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      options: [],
      selected: null,
      error: null,
    }
  },
  apollo: {
    multiAccessKey: {
      query: MultiAccessKeyQuery,
      result({ data, loading }) {
        if (!loading) {
          this.options = this.createOptions()
        }
      },
      error(error) {
        this.error = error
      },
      skip: true,
    },
  },
  created() {
      const variables = {id: this.keyId}
      console.log(variables)
      this.$apollo.queries.multiAccessKey.setVariables(variables)
      this.$apollo.queries.multiAccessKey.skip = false
  },
  mounted() {
    this.selected = this.featureId
  },
  methods: {
    createOptions() {
      let options = []
      if (this.multiAccessKey.featureGroups.length) {
        options = this.multiAccessKey.featureGroups.map(group => {
          return {
            label: group.name,
            options: group.children.map(child => {
              return {
                value: child.id,
                text: child.name
              }
            })
          }
        })
      }
      else {
        options = this.multiAccessKey.features.map(feature => {
          return {
            value: feature.id,
            text: feature.name
          }
        })
      }
      return options
    },
    onChange() {
      this.$router.push({
        name: 'multi-access-keys-features-id',
        params: {
          id: this.selected
        }
      })
    }
  },
}

</script>