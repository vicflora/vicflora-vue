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
  <BRow>
    <BCol>
      <table class="table">
        <thead>
          <tr>
            <th>Vernacular name</th>
            <th>Preferred</th>
            <th>Usage</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(name, index) in concept.vernacularNames"
            :key="name.id"
          >
            <td>{{ name.name }}</td>
            <td><input type="checkbox" :checked="name.isPreferred"/></td>
            <td>{{ name.nameUsage }}</td>
            <td class="text-right">
              <ButtonAppend
                :button="'update'"
                :form="'VernacularNameForm'"
                :value="name"
                :index="index"
              />
              <span v-if="!name.isPreferred || concept.vernacularNames.length === 1" class="vf-delete-button">
                <BButton 
                  variant="danger" 
                  size="sm"
                  @click="onDeleteButtonClicked(name)"
                ><FontAwesomeIcon icon="trash-can"/></BButton>
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-right">
              <ButtonAppend
                :button="'create'"
                :form="'VernacularNameForm'"
                :value="{isPreferred: true}"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </BCol>
  </BRow>
</template>

<script>
const VernacularNameForm = () => import('@/components/Forms/VernacularNameForm')
const ButtonAppend = () => import('@/components/FormControls/AppButtonAppend')

import gql from "graphql-tag"
const DeleteVernacularNameMutation = gql`mutation ($id: ID!) {
  deleteVernacularName(id: $id) {
    id
  }
}`

export default {
  name: 'TaxonTabEditVernacularNames',
  components: {
    VernacularNameForm,
    ButtonAppend,
  },
  props: {
    concept: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: null,
      modal: null,
      value: {},
    }
  },
  methods: {
    openModal(action, name={}) {
      this.modal = `${action}-vernacular-name-form`
      this.form = 'VernacularNameForm'
      this.value = name
      this.$bvModal.show(this.modal)
    },
    onDeleteButtonClicked(name) {
      const msg = `Delete vernacular name '${name.name}'?`
      this.$bvModal.msgBoxConfirm(msg)
          .then(value => {
            if (value) {
              this.deleteVernacularName(name.id)
            }
          })
    },
    deleteVernacularName(id) {
      this.$apollo.mutate({
        mutation: DeleteVernacularNameMutation,
        variables: {
          id: id,
        },
      }).then(({data}) => {
        console.log(JSON.stringify(data))
        $nuxt.$emit('vernacular-names-updated')
      })
    }
  },
}
</script>

<style lang="scss">
.vf-delete-button {
  .btn {
    border-radius: 0;
    margin-top: -3px;
  }
}
</style>