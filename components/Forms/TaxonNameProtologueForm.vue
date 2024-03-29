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
  <b-modal
    id="update-taxon-name-protologue-form"
    size="lg"
    :title="value.id !== undefined ? 'Update protologue' : 'Add protologue'"
    :ok-title="value.id !== undefined ? 'Update' : 'Save'"
    :ok-disabled="okDisabled"
    @ok="onOk"
  >
    <div class="taxon-name-form">
      <taxon-name-protologue-form-generator 
        :schema="schema"
        :value="formData"
        @input="okDisabled = false"
      />
    </div>
    <template slot="modal-ok"><FontAwesomeIcon icon="floppy-disk"/> Save</template>
    <template slot="modal-cancel"><FontAwesomeIcon icon="ban"/> Cancel</template>
  </b-modal>
</template>

<script>
import schema from "@/config/taxonNameProtologueFormSchema"
import { 
  TaxonNameProtologue, 
  UpdateTaxonNameProtologueInput, 
  CreateTaxonNameProtologueInput, 
} from "@/models/TaxonNameProtologueModel"
import TaxonNameProtologueFormGenerator from '@/components/Forms/TaxonNameProtologueFormGenerator.vue'

import gql from "graphql-tag"
const UpdateReferenceMutation = gql`mutation UpdateReferenceMutation($input: UpdateReferenceInput!) {
  updateReference(input: $input) {
    id
    title
    volume
    issue
    pages
    publicationYear
    referenceString
  } 
}`
const CreateReferenceMutation = gql`mutation CreateReferenceMutation($input: CreateReferenceInput!) {
  createReference(input: $input) {
    id
    title
    volume
    issue
    pages
    publicationYear
    referenceString
  }
}`

export default {
  name: "TaxonNameProtologueForm",
  components: {
    TaxonNameProtologueFormGenerator,
  },
  props: {
    value: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      formData: {},
      okDisabled: true,
    }
  },
  computed: {
    schema() {
      return schema
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(value) {
        this.formData = new TaxonNameProtologue(value || {})
      }
    }
  },
  methods: {
    onOk(event) {
      event.preventDefault()
      this.okDisabled = true
      let mutation = false
      let input = false
      if (this.value.id !== undefined) {
        mutation = UpdateReferenceMutation
        input = new UpdateTaxonNameProtologueInput(this.formData)
      }
      else {
        mutation = CreateReferenceMutation
        input = new CreateTaxonNameProtologueInput(this.formData)
      }
      this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: {...input},
        },
      }).then(({ data }) => {
        console.log(JSON.stringify(data, null, 2))
        this.formData = data.createReference
        this.$nuxt.$emit('taxon-name-protologue-updated', data.createReference)
        this.$bvModal.hide('update-taxon-name-protologue-form')
      }).catch((error) =>  {
        console.log(error)
      })
    },
  }
}
</script>