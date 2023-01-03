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
    <div
      v-if="alert"
      class="alert alert-danger"
    >
      {{ alert }}
    </div>
    <div class="taxon-name-form">
      <TaxonNameFormGenerator
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
import schema from "@/config/taxonNameFormSchema"
import {
  TaxonName,
  UpdateTaxonNameInput,
  CreateTaxonNameInput
} from "@/models/TaxonNameModel"
import { formMethodsMixin } from "@/mixins/formMixins"

const TaxonNameFormGenerator = () => import("@/components/Forms/TaxonNameFormGenerator.vue")

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
      referenceString
    }
  }
}`

const parentQuery = gql`query ($id: ID!) {
  parent: taxonConcept(id: $id) {
    id
    taxonName {
      id
      fullName
      rank
    }
    taxonRank
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
      referenceString
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
      referenceString
    }
  }
}`

export default {
  name: "TaxonNameForm",
  components: {
    TaxonNameFormGenerator,
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
  },
  data() {
    return {
      taxonName: {},
      parentName: {},
      okDisabled: true,
      alert: null,
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
    parent: {
      query: parentQuery,
      skip: true,
      result({ data, loading }) {
        if (!loading) {
          console.log(JSON.stringify(data, null, 2))
          this.parentName = data.parent.taxonName
          this.taxonName = new TaxonName()
          switch (data.parent.taxonRank) {
            case 'GENUS':
              this.taxonName.rank = 'SPECIES'
              this.taxonName.parent = data.parent.taxonName
              this.showHideField('parent', true)
              break;

            case 'SPECIES':
              this.taxonName.parent = data.parent.taxonName
              break;
            default:
              break;
          }
        }
      }
    }
  },
  computed: {
    formData() {
      return new TaxonName(this.taxonName || {})
    },
    schema() {
      return schema
    }
  },
  watch: {
    parentName: {
      immediate: true,
      deep: true,
      handler(parentName) {
        if (this.formData.rank === undefined) {
          const index = this.schema.map(element => element.name).indexOf('rank')
          let options = this.schema[index].options
          const optionIndex = options.map(option => option.value).indexOf(this.parentName.rank)
          options.splice(0, optionIndex + 1)
          this.schema[index].options = options
          this.formData.rank = options[0].value
        }
      }
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

    this.$nuxt.$on('taxon-name-protologue-updated', value => {
      this.formData.protologue = value
    })
  },
  methods: {
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
          id: this.value.id,
        })
        this.$apollo.queries.taxonName.skip = false
      }
      else {
        if (this.$route.name === 'flora-taxon-add-child') {
          this.$apollo.queries.parent.setVariables({
            id: this.$route.params.id
          })
          this.$apollo.queries.parent.skip = false
        }
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
      }).then(({data}) => {
        console.log(JSON.stringify(data, null, 2))
        $nuxt.$emit('taxon-name-updated',
            data.updateTaxonName || data.createTaxonName)
        this.$bvModal.hide(this.id)
      }).catch(error => {
        this.alert = error
      })
    }
  }

}
</script>
