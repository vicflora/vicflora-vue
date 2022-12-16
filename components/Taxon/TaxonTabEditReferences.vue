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
  <div v-if="concept.references">
    <div v-for="ref in references"
      :key="ref.id">
      <div>
        <b v-html="ref.reference.authorYear"></b>
        <a href="#" @click="onUpdateClicked($event, ref.reference)"><FontAwesomeIcon icon="pen-to-square"/></a>
        <a href="#" @click="onDeleteClicked($event, ref.id)"><FontAwesomeIcon icon="trash-can"/></a>
      </div>
      <p v-html="ref.reference.referenceString"/>
    </div>
    <div class="d-flex">
      <div class="flex-grow-1">
        <AutocompleteControl
          :key="autocompleteComponentKey"
          :name="'reference'"
          :autocomplete="{
            query: ReferenceAutocompleteQuery,
            serializer: referenceAutocompleteSerializer,
            showSelected: true,
            suggestionField: 'referenceStringHtml',
          }"
          :buttons="['update', 'create']"
          :form="'ReferenceForm'"
          :inForm="'taxon-references'"
          :value="newReference"
          :index="concept.references.length"
          @input="onSelected"
        />
      </div>
      <div>
        <BButton
          class="vf-add-taxon-reference"
          variant="primary"
          size="sm"
          :disabled="!newReference"
          @click="onAddButtonClicked"
        >
          <FontAwesomeIcon icon="plus"/>
        </BButton>
      </div>
    </div>
    <ReferenceForm
      :id="'update-reference-form'"
      :value="reference"
      :mode="'update'"
    />
  </div>
</template>

<script>
const ReferenceForm = () => import('@/components/Forms/ReferenceForm')
const AutocompleteControl = () => import('@/components/FormControls/AppAutocompleteControl')
import deleteTaxonConceptReferenceMutation from '@/graphql/mutations/deleteTaxonConceptReferenceMutation'
import createTaxonConceptReferenceMutation from '@/graphql/mutations/createTaxonConceptReferenceMutation'
import ReferenceAutocompleteQuery from '@/graphql/queries/ReferenceAutocompleteQuery'

const referenceAutocompleteSerializer = (reference) => {
  return reference.author.name + ' ' + reference.publicationYear
}

export default {
  name: 'TaxonTabEditReferences',
  components: {
    ReferenceForm,
    AutocompleteControl
  },
  props: {
    concept: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reference: null,
      newReference: null,
      autocompleteComponentKey: 0,
      ReferenceAutocompleteQuery,
      referenceAutocompleteSerializer
    }
  },
  computed: {
    references() {
      return this.concept.references.map((ref) => {
        return this.splitOffAuthorYear(ref)
      })
    },
  },
  created() {
    this.$nuxt.$on('taxon-references-reference-changed', (reference) => {
      this.newReference = reference
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('taxon-references-reference-changed')
  },
  methods: {
    splitOffAuthorYear(ref) {
      let referenceString = ref.reference.referenceStringHtml.replace('<p>', '').replace('</p>', '').trim()
      ref.reference.authorYear = referenceString.substring(8, referenceString.indexOf('</strong>')).trim()
      ref.reference.referenceString = referenceString.substring(referenceString.indexOf('</strong>')+10).trim()
      return ref
    },
    onUpdateClicked(event, reference) {
      event.preventDefault()
      this.reference = reference
      this.$bvModal.show('update-reference-form')
    },
    onDeleteClicked(event, id) {
      event.preventDefault()
      const msg = `Delete taxon concept reference ${id}?`
      this.$bvModal.msgBoxConfirm(msg)
          .then(value => {
            if (value) {
              this.deleteTaxonConceptReference(id)
            }
          })
    },
    onSelected(item) {
      this.newReference = item
    },
    onAddButtonClicked() {
      if (this.concept.references.map(ref => {
              return ref.reference.id
            }
          ).indexOf(this.newReference.id) > -1) {
        const message = 'This reference is already cited'
        this.$bvModal.msgBoxOk(message)
      }
      else {
        this.createTaxonConceptReference()
      }
    },
    createTaxonConceptReference() {
      const input = {
        taxonConcept: {
          connect: this.concept.id,
        },
        reference: {
          connect: this.newReference.id,
        },
      }
      console.log(JSON.stringify(input, null, 2))
      this.$apollo.mutate({
        mutation: createTaxonConceptReferenceMutation,
        variables: {
          input: input
        }
      }).then(({ data }) => {
        this.$nuxt.$emit('taxon-reference-added')
        this.newReference = null
        this.autocompleteComponentKey++
      }).catch(error => {
        console.log(error)
      })
    },
    deleteTaxonConceptReference(id) {
      const index = this.concept.references.map((item) => {return item.id}).indexOf(id)
      this.concept.references.splice(index, 1)
      this.$apollo.mutate({
        mutation: deleteTaxonConceptReferenceMutation,
        variables: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss">
.vf-add-taxon-reference {
  margin-left: 1rem;
  height: 38px;
  width: 38px;
}
</style>
