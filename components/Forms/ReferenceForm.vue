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
    :id="id"
    :title="id == 'update-reference-form' ? 'Update reference' : 'Create reference'"
    :ok-title="id == 'update-reference-form' ? 'Update' : 'Save'"
    :ok-disabled="okDisabled"
    size="lg"
    @shown="onShown"
    @ok="onOk"
  >
    <div class="reference-form">
      <ReferenceFormGenerator
        :schema="schema"
        :value="formData"
        @input="onInput"
      />
    </div>
    <template slot="modal-ok"><FontAwesomeIcon icon="floppy-disk"/> Save</template>
    <template slot="modal-cancel"><FontAwesomeIcon icon="ban"/> Cancel</template>
  </b-modal>
</template>

<script>
import schema from "@/config/referenceFormConfig"
import { formMethodsMixin } from "@/mixins/formMixins"
import { Reference, CreateReferenceInput, UpdateReferenceInput } from '@/models/ReferenceModel'

const ReferenceFormGenerator = () => import("@/components/Forms/ReferenceFormGenerator.vue")

import gql from "graphql-tag"
const ReferenceQuery = gql`query ($id: ID!) {
  reference(id: $id) {
    id
    referenceType
    author {
      id
      name
    }
    contributors {
      contributorRole
      agent {
        id
        name
      }
      sequence
    }
    publicationYear
    title
    edition
    journal {
      id
      referenceString
    }
    book {
      id
      author {
        id
        name
      }
      publicationYear
      referenceString
    }
    volume
    issue
    pageStart
    pageEnd
    pages
    numberOfPages
    publisher
    placeOfPublication
    isbn
    issn
    doi
  }
}`

const UpdateReferenceMutation = gql`mutation ($input: UpdateReferenceInput!) {
  reference: updateReference(input: $input) {
    id
    author {
      id
      name
    }
    publicationYear
    referenceString
    referenceStringHtml
  }
}`

const CreateReferenceMutation = gql`mutation ($input: CreateReferenceInput!) {
  reference: createReference(input: $input) {
    id
    author {
      id
      name
    }
    publicationYear
    referenceString
    referenceStringHtml
  }
}`

export default {
  name: "ReferenceForm",
  components: {
    ReferenceFormGenerator,
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
      required: false,
    },
    subtype: {
      type: String,
      default: 'ARTICLE',
    },
    calledFrom: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      reference: {},
      okDisabled: true,
      schema: [],
    }
  },
  apollo: {
    reference: {
      query: ReferenceQuery,
      skip: true,
    },
  },
  computed: {
    formData() {
      return new Reference(this.reference || {referenceType: this.subtype.toUpperCase()})
    },
  },
  watch: {
    'formData.referenceType': {
      immediate: true,
      deep: true,
      handler(referenceType) {
        if (referenceType) {
          this.schema = schema[referenceType]
        }
        else {
          this.schema = schema.ARTICLE
        }
      }
    }
  },
  created() {
    this.$nuxt.$on('reference-author-changed', (agent) => {
      this.formData.author = agent
      this.okDisabled = false
    })
    this.$nuxt.$on('reference-journal-changed', (reference) => {
      this.formData.journal = reference
      this.okDisabled = false
    })
    this.$nuxt.$on('reference-book-changed', (reference) => {
      this.formData.book = reference
      this.okDisabled = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('reference-author-changed')
    this.$nuxt.$off('reference-journal-changed')
    this.$nuxt.$off('reference-book-changed')
  },
  methods: {
    onShown() {
      if (this.mode == 'update') {
        this.$apollo.queries.reference.setVariables({
          id: this.value.id,
        })
        this.$apollo.queries.reference.skip = false
      }
    },
    onInput(fieldName, value) {
      this.okDisabled = false
      console.log({fieldName: fieldName, value: value})
      if (fieldName === 'referenceType') {
        this.schema = schema[value]
      }
    },
    onOk(event) {
      event.preventDefault()
      this.okDisabled = true
      let mutation = false
      let input = false
      if (this.mode === 'update') {
        mutation = UpdateReferenceMutation
        input = new UpdateReferenceInput(this.formData)
      }
      else {
        mutation = CreateReferenceMutation
        input = new CreateReferenceInput(this.formData)
      }
      console.log(JSON.stringify(input, null, 2))
      this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: {...input},
        },
      }).then(({data}) => {
        console.log(JSON.stringify(data, null, 2))
        if (this.calledFrom) {
          this.$nuxt.$emit(`${this.calledFrom}-changed`, data.reference)
        }
        this.$bvModal.hide(this.id)
      })
    }
  }

}
</script>
