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
    id="taxon-name-protologue-modal"
    size="lg"
    :title="protologue ? 'Update protologue' : 'Add protologue'"
    :ok-title="protologue ? 'Update' : 'Save'"
    :ok-disabled="okDisabled"
    @ok="onOk"
  >
    <div class="taxon-name-form">
      <taxon-name-protologue-form-generator 
        :schema="schema"
        :value="formData"
        @input="okDisabled=false"
      />
    </div>
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
  } 
}`
const CreateReferenceMutation = gql`mutation CreateReferenceMutation($input: CreateReferenceInput!) {
  createReference(input: $input) {
    id
  }
}`

export default {
  name: "TaxonNameProtologueModal",
  components: {
    TaxonNameProtologueFormGenerator,
  },
  props: {
    protologue: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      okDisabled: true,
    }
  },
  computed: {
    formData() {
      return new TaxonNameProtologue(this.protologue || {})
    },
    schema() {
      return schema
    },
    okTitle() {
      return this.protologue ? 'Update' : 'Save'
    }
  },
  created() {
    this.value = this.protologue
  },
  methods: {
    onOk(event) {
      event.preventDefault()
      this.okDisabled = true
      let mutation = false
      let input = false
      if (this.protologue) {
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
      }).then(data => {
        $nuxt.$emit('protologue-updated');
        this.$bvModal.hide('taxon-name-protologue-modal')
      }).catch((error) =>  {
        console.log(error)
      })
    },
  }
}
</script>