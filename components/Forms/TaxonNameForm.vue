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
    :title="id == 'update-taxon-name-form' ? 'Update taxon name' : 'Create taxon name'"
    :ok-title="id == 'update-taxon-name-form' ? 'Update' : 'Save'"
    :ok-disabled="okDisabled"
    size="lg"
    @show="onShow"
    @ok="onOk"
  >
    <div class="taxon-name-form">
      <TaxonNameFormGenerator 
        :schema="schema"
        :value="formData"
        @input="okDisabled = false"
      />
    </div>
  </b-modal>
</template>

<script>
import schema from "@/config/taxonNameFormSchema"
import { 
  TaxonName, 
  UpdateTaxonNameInput, 
  CreateTaxonNameInput
} from "@/models/TaxonNameModel"
import TaxonNameFormGenerator from '@/components/Forms/TaxonNameFormGenerator.vue'

import gql from "graphql-tag"
const TaxonNameQuery = gql`query TaxonNameQuery($id: ID!) {
  taxonName(id: $id) {
    id
    rank
    parent {
      id
      fullName
      rank
    }
    namePart
    fullName
    authorship
    nameType
    protologue {
      id
      title
      volume
      issue
      pages
      publicationYear
      citation
    }
  }
}`

const UpdateTaxonNameMutation = gql`mutation UpdateTaxonNameMutation ($input: UpdateTaxonNameInput!) {
  updateTaxonName(input: $input) {
    id
    rank
    parent {
      id
      fullName
      rank
    }
    namePart
    fullName
    authorship
    nameType
    protologue {
      id
      title
      volume
      issue
      pages
      publicationYear
      citation
    }
  }
}`

const CreateTaxonNameMutation = gql`mutation CreateTaxonNameMutation($input: CreateTaxonNameInput!) {
  createTaxonName(input: $input) {
    id
    rank
    parent {
      id
      fullName
      rank
    }
    namePart
    fullName
    authorship
    nameType
    protologue {
      id
      title
      volume
      issue
      pages
      publicationYear
      citation
    }
  }
}`

export default {
  name: "TaxonNameForm",
  components: {
    TaxonNameFormGenerator,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    taxonNameProp: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      taxonName: {},
      okDisabled: true,
    }
  },
  apollo: {
    taxonName: {
      query: TaxonNameQuery,
      skip: true,
      result({ data, loading }) {
        if (!loading) {
          this.showHideParent(data.taxonName.rank)
        }
      }
    },
  },
  computed: {
    formData() {
      return new TaxonName(this.value || {})
    },
    schema() {
      return schema
    }
  },
  created() {
    this.$nuxt.$on('taxon-name-form-input', (field, value) => {
      if (field === 'rank') {
        this.showHideParent(value)
      }
      if (['rank', 'parent', 'namePart'].indexOf(field) > -1) {
        this.fullName()
      }
    })

    this.$nuxt.$on('protologue-updated', (data) => {
      this.formData.protologue = data
    })
  },
  methods: {
    showHideField(field, show=true) {
      const index = this.schema.map(element => element.name).indexOf(field)
      this.schema[index].hide = !show
    },
    showHideParent(rank) {
      const showParentFor = [
        'SPECIES',
        'SUBSPECIES',
        'VARIETY',
        'SUBVARIETY',
        'FORM',
      ]
      if (showParentFor.indexOf(rank) > -1) {
        this.showHideField('parent', true)
        this.formData.parent = this.taxonName.parent ? new TaxonName(this.taxonName.parent) : null
      }
      else {
        this.showHideField('parent', false)
        this.formData.parent = {}
      }
    },
    onShow() {
      if (this.id == 'update-taxon-name-form') {
        this.$apollo.queries.taxonName.setVariables({
          id: this.taxonNameProp.id,
        })
        this.$apollo.queries.taxonName.skip = false
      }
    },
    fullName(data) {
      const ranksWithNameParents = [
        'SPECIES',
        'SUBSPECIES',
        'VARIETY',
        'SUBVARIETY',
        'FORM',
      ]
      if (ranksWithNameParents.indexOf(this.formData.rank) > -1) {
        console.log(JSON.stringify(data, null, 2))
        let between = ''
        switch(this.formData.rank) {
          case 'SUBSPECIES':
            between = ' subsp. '
            break

          case 'VARIETY':
            between = ' var. '
            break

          case 'SUBVARIETY':
            between = ' subvar. '
            break

          case 'FORM':
            between = ' f. '
            break

          default:
            between = ' '
        }
        if (this.formData.parent) {
          this.formData.fullName = 
              this.formData.parent.fullName + between + this.formData.namePart
        }
      }
      else {
        this.formData.fullName = this.formData.namePart
      }
    },
    onOk(event) {
      event.preventDefault()
      this.okDisabled = true
      let mutation = false
      let input = false
      if (this.id == 'update-taxon-name-form') {
        mutation = UpdateTaxonNameMutation
        input = new UpdateTaxonNameInput(this.formData)
      }
      else {
        mutation = CreateTaxonNameMutation
        input = new CreateTaxonNameInput(this.formData)
      }
      console.log(JSON.stringify(input, null, 2))
      this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: {...input},
        },
      }).then(data => {
        $nuxt.$emit('taxon-name-updated', 
            data.data.updateTaxonName || data.data.createTaxonName)
        this.$bvModal.hide(this.id)
      })
    }
  }

}
</script>