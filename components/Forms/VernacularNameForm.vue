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
  <BModal
    :id="id"
    :title="id.indexOf('update-vernacular-name-form') > -1 ? 'Update vernacular name' : 'Create vernacular name'"
    :ok-title="id.indexOf('update-vernacular-name-form') > -1 ? 'Update' : 'Save'"
    :ok-disabled="okDisabled"
    @ok="onOk"
  >
    <div class="vernacular-name-form">
      <VernacularNameFormGenerator
        :schema="schema"
        :value="formData"
        @input="okDisabled = false"
      />
    </div>
    <template slot="modal-ok"><FontAwesomeIcon icon="floppy-disk"/> Save</template>
    <template slot="modal-cancel"><FontAwesomeIcon icon="ban"/> Cancel</template>
  </BModal>
</template>

<script>
import schema from "@/config/vernacularNameFormSchema"
import { 
  VernacularName, 
  UpdateVernacularNameInput, 
  CreateVernacularNameInput
} from "@/models/VernacularNameModel"
import { formMethodsMixin } from "@/mixins/formMixins"

const VernacularNameFormGenerator = () => import("@/components/Forms/VernacularNameFormGenerator.vue")

import gql from "graphql-tag"
const UpdateVernacularNameMutation = gql`mutation ($input: UpdateVernacularNameInput!) {
  updateVernacularName(input: $input) {
    id
  }
}`

const CreateVernacularNameMutation = gql`mutation ($input: CreateVernacularNameInput!) {
  createVernacularName(input: $input) {
    id
  }
}`

export default {
  name: 'VernacularNameForm',
  components: {
    VernacularNameFormGenerator
  },
  mixins: [
    formMethodsMixin,
  ],
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      okDisabled: true,
    }
  },
  computed: {
    formData() {
      return new VernacularName(this.value)
    },
    schema() {
      return schema
    },
  },
  created() {},
  methods: {
    onOk(event) {
      event.preventDefault()
      this.okDisabled = true
      let mutation = false
      let input = false
      if (this.id.indexOf('update-vernacular-name-form') > -1) {
        mutation = UpdateVernacularNameMutation
        input = new UpdateVernacularNameInput(this.formData)
      }
      else {
        mutation = CreateVernacularNameMutation
        input = new CreateVernacularNameInput(this.formData)
      }
      input.taxonConcept.connect = this.$route.params.id
      console.log(JSON.stringify(input, null, 2))
      this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: {...input},
        },
      }).then(({ data }) => {
        console.log(JSON.stringify(data, null, 2))
        $nuxt.$emit('vernacular-names-updated')
        this.$bvModal.hide(this.id)
      })
    },
  },
}
</script>

