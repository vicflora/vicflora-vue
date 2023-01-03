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
  <div
    :id="id"
    class="new-taxon-concept-form"
  >
    <b-alert
      v-if="success"
      variant="success"
      show
      dismissible
    >
      <div v-html="success"/>
    </b-alert>
    <b-alert
      v-if="error"
      variant="danger"
      show
      dismissible
    >
      <div v-html="error"/>
    </b-alert>
    <new-taxon-concept-form-generator
      :schema="schema"
      :value="formData"
    />
    <div class="form-group text-right">
      <BButton @click="onCancel">Cancel</BButton>
      <BButton variant="primary" :disabled="okDisabled" @click="onOk">Save</BButton>
    </div>
  </div>
</template>

<script>
import schema from "@/config/newTaxonConceptFormSchema"
import {
  TaxonConcept,
  CreateTaxonConceptInput
} from "@/models/TaxonConceptModel"
import { formMethodsMixin } from "@/mixins/formMixins"
import CreateTaxonConceptMutation
    from '@/graphql/mutations/CreateTaxonConceptMutation'
import UpdateSolrIndexMutation
    from '@/graphql/mutations/UpdateSolrIndexMutation'

const NewTaxonConceptFormGenerator = () =>
  import('@/components/Forms/NewTaxonConceptFormGenerator')

export default {
  name: "NewTaxonConceptForm",
  components: {
    NewTaxonConceptFormGenerator,
  },
  mixins: [
    formMethodsMixin,
  ],
  props: {
    id: {
      type: String,
      required: true,
    },
    taxonConcept: {
      type: Object,
      required: true,
    },
    defaultPublicationStatus: {
      type: String,
      default: 'PUBLISHED'
    }
  },
  data() {
    return {
      formData: null,
      okDisabled: true,
      success: null,
      error: null
    }
  },
  computed: {
    schema() {
      return schema
    },
    taxonConceptLabel() {
      const name = this.formData.taxonName ? this.formData.taxonName.fullName : ''
      const accordingTo = this.formData.accordingTo ?
          this.formData.accordingTo.quickRef : null
      let label = name
      if (accordingTo) {
        label += ' sec. ' + accordingTo
      }
      return label
    }
  },
  watch: {
    taxonConcept: {
      immediate: true,
      deep: true,
      handler(taxonConcept) {
        this.formData = new TaxonConcept(taxonConcept || {})
        if (this.formData.publicationStatus === undefined) {
          this.formData.publicationStatus = this.defaultPublicationStatus
        }
        const index = this.schema.map(element => element.name).indexOf('taxonRank')
        let options = this.schema[index].options
        const optionIndex = options.map(option => option.value).indexOf(this.taxonConcept.parent.taxonRank)
        options.splice(0, optionIndex + 1)
        this.schema[index].options = options
        this.formData.taxonRank = options[0].value
        this.formData.occurrenceStatus = 'PRESENT'
        this.formData.establishmentMeans = 'NATIVE'
        this.formData.degreeOfEstablishment = 'NATIVE'
      }
    },
    taxonConceptLabel: {
      immediate: true,
      handler(label) {
        this.$nuxt.$emit('taxon-concept-label-changed', label)
      }
    },
  },
  created() {
    this.$nuxt.$on('taxon-name-updated', data => {
      this.formData.taxonName = data
      const index = this.schema.map(element => element.name).indexOf('taxonName')
      this.okDisabled = false
    })

    this.$nuxt.$on('new-taxon-concept-form-input', (fieldName, value) => {
      this.okDisabled = false
      if (fieldName === 'occurrenceStatus') {
        this.handleOccurrenceStatus(value)
      }
      if (fieldName === 'establishmentMeans') {
        this.handleEstablishmentMeans(value)
      }
    })


  },
  methods: {
    handleOccurrenceStatus(value) {
      this.showHideField('endemic', value === 'PRESENT')
    },
    handleEstablishmentMeans(value) {
      this.showHideField('hasIntroducedOccurrences', ['NATIVE', 'UNCERTAIN'].indexOf(value) > -1)
    },
    onCancel() {
      this.formData = this.taxonConcept
    },
    onOk() {
      this.success = null
      this.error = null
      this.okDisabled = true
      const errors = this.validate()
      if (!errors.length) {
        this.createTaxonConcept()
      }
      else {
        let message = '<p><b>Form validation errors:</b></p><ul>'
        errors.forEach(error => {
          message += error
        })
        message += '</ul>'
        this.error = message
      }
    },
    validate() {
      let errors = []
      if (!this.formData.taxonName) {
        errors.push("&apos;Taxon name&apos; field has no value")
      }
      return errors
    },
    createTaxonConcept() {
      let input = new CreateTaxonConceptInput(this.formData)
      console.log(JSON.stringify(input, null, 2))
      this.$apollo.mutate({
        mutation: CreateTaxonConceptMutation,
        variables: {
          input: {...input},
        },
      }).then(({ data }) => {
        console.log(JSON.stringify(data, null, 2))
        this.updateSolr(data.createTaxonConcept.id)
        this.$nuxt.$emit('new-taxon-concept-created')
        this.$router.push({
          name: 'flora-taxon-edit',
          params: {
            id: data.createTaxonConcept.id
          }
        })
      }).catch((error) => {
        this.error = `Update failed: ${ error }`
      })
    },
    updateSolr(id) {
      console.log('Update SOLR index...')
      this.$apollo.mutate({
        mutation: UpdateSolrIndexMutation,
        variables: {
          id: id,
        },
      }).then(({data}) => {
        console.log('SOLR index updated: ' + data.updateSolrIndex.id)
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>
