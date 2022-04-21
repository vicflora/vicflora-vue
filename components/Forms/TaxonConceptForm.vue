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
    class="taxon-concept-form"
  >
    <taxon-concept-form-generator 
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
import schema from "@/config/taxonConceptFormSchema"
import { 
  TaxonConcept, 
  UpdateTaxonConceptInput, 
  CreateTaxonConceptInput 
} from "@/models/TaxonConceptModel"
import { formMethodsMixin } from "@/mixins/formMixins"
import gql from "graphql-tag"

const TaxonConceptFormGenerator = () => import('@/components/Forms/TaxonConceptFormGenerator')

const UpdateTaxonConceptMutation = gql`mutation UpdateTaxonConceptMutation($input: UpdateTaxonConceptInput!) {
  updateTaxonConcept(input: $input) {
    id
    taxonName {
      id
      fullName
      authorship
    }
    taxonRank
    taxonomicStatus
    occurrenceStatus
    endemic
    establishmentMeans
    hasIntroducedOccurrences
    degreeOfEstablishment
    parent {
      id
      taxonName {
        id
        fullName
        authorship
      }
    }
    acceptedConcept {
      id
      taxonName {
        id
        fullName
        authorship
      }
    }
    remarks
  }
}`

const CreateTaxonConceptMutation = gql`mutation CreateTaxonConceptMutation($input: CreateTaxonConceptInput!) {
  createTaxonConcept(input: $input) {
    id
    taxonName {
      id
      fullName
      authorship
    }
    taxonRank
    taxonomicStatus
    occurrenceStatus
    endemic
    establishmentMeans
    hasIntroducedOccurrences
    degreeOfEstablishment
    parent {
      id
      taxonName {
        id
        fullName
        authorship
      }
    }
    acceptedConcept {
      id
      taxonName {
        id
        fullName
        authorship
      }
    }
    remarks
  }
}`

export default {
  name: "TaxonConceptForm",
  components: {
    TaxonConceptFormGenerator,
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
    }
  },
  data() {
    return {
      formData: null,
      okDisabled: true,
    }
  },
  computed: {
    schema() {
      return schema
    },
    taxonConceptLabel() {
      const name = this.formData.taxonName.fullName
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
    })

    this.$nuxt.$on('taxon-concept-form-input', (fieldName, value) => {
      this.okDisabled = false
      if (fieldName === 'taxonomicStatus') {
        this.handleTaxonomicStatus(value)
      }
      if (fieldName === 'occurrenceStatus') {
        this.handleOccurrenceStatus(value)
      }
      if (fieldName === 'establishmentMeans') {
        this.handleEstablishmentMeans(value)
      }
    })
  },
  methods: {
    handleTaxonomicStatus(value) {
      if (value === 'ACCEPTED') {
        this.formData.acceptedConcept = null
        this.showHideField('acceptedConcept', false)
        this.showHideField('occurrenceStatus', true)
        this.showHideField('establishmentMeans', true)
        this.showHideField('degreeOfEstablishment', true)
      }
      else {
        this.showHideField('occurrenceStatus', false)
        this.showHideField('establishmentMeans', false)
        this.showHideField('degreeOfEstablishment', false)
        
        if (['SYNONYM', 'HOMOTYPIC_SYNONYM', 'HETEROTYPIC_SYNONYM', 'MISAPPLICATION']) {
          this.formData.acceptedConcept = null
          this.formData.acceptedConcept = 
              this.taxonConcept.parent ? 
              new TaxonConcept(this.taxonConcept.acceptedConcept) : null
          this.showHideField('acceptedConcept', true)
        }
        else {
          this.showHideField('acceptedConcept', false)
        }
      }
    },
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
      this.okDisabled = true
      let mutation = false
      let input = false
      if (this.id === 'taxon-concept-update') {
        mutation = UpdateTaxonConceptMutation
        input = new UpdateTaxonConceptInput(this.formData)
      }
      else {
        mutation = CreateTaxonConceptMutation
        input = new CreateTaxonConceptInput(this.formData)
      }
      console.log(JSON.stringify(input, null, 2))
      this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: {...input},
        },
      }).then(({ data }) => {
        console.log(JSON.stringify(data, null, 2))
        if (this.$route.name === 'flora-taxon-add-child') {
          this.$router.push({
            name: 'flora-taxon-edit',
            params: {
              id: data.createTaxonConcept.id
            }
          })
        }
      })
    }
  },
}
</script>