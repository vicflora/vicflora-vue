// Copyright 2022 Royal Botanic Gardens Board
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import gql from "graphql-tag"

import TaxonConceptAutoCompleteQuery from '@/graphql/queries/TaxonConceptAutocompleteQuery'

const taxonConceptSuggestionSerializer =  (concept) => {
  return concept.taxonName.authorship
      ? concept.taxonName.fullName + ' ' + concept.taxonName.authorship
      : concept.taxonName.fullName
}

import taxonNameAutoCompleteQuery from '@/graphql/queries/TaxonNameAutocompleteQuery'

const taxonNameSuggestionSerializer = (name) => {
  return name.authorship ? name.fullName + ' ' + name.authorship : name.fullName
}

import ReferenceAutocompleteQuery from '@/graphql/queries/ReferenceAutocompleteQuery'

const referenceAutocompleteSerializer = (reference) => {
  return reference.author.name + ' ' + reference.publicationYear
}

export default [
  {
    fieldType: "AutocompleteControl",
    name: "taxonName",
    label: "Taxon name",
    placeholder: "Start typing taxon name...",
    autocomplete: {
      query: taxonNameAutoCompleteQuery,
      serializer: taxonNameSuggestionSerializer
    },
    buttons: ["create"],
    description: "Please start typing a name and select a name from the drop-down list, or click the '+' button to create a new Taxon Name. Do not just type in a name and move on.",
    form: "TaxonNameForm"
  },
  {
    fieldType: "AutocompleteControl",
    name: "accordingTo",
    label: "According to",
    autocomplete: {
      query: ReferenceAutocompleteQuery,
      serializer: referenceAutocompleteSerializer,
      showSelected: true,
      suggestionField: "referenceStringHtml"
    }
  },
  {
    fieldType: "AutocompleteControl",
    name: "parent",
    label: "Parent",
    autocomplete: {
      query: TaxonConceptAutoCompleteQuery,
      serializer: taxonConceptSuggestionSerializer,
    }
  },
  {
    fieldType: "SelectList",
    name: "taxonRank",
    label: "Rank",
    multi: false,
    options: [
      { value: "KINGDOM", label: "Kingdom" },
      { value: "SUBKINGDOM", label: "Subkingdom" },
      { value: "PHYLUM", label: "Phylum" },
      { value: "SUBPHYLUM", label: "Subphylum" },
      { value: "CLASS", label: "Class" },
      { value: "SUBCLASS", label: "Subclass" },
      { value: "SUPERORDER", label: "Superorder" },
      { value: "ORDER", label: "Order" },
      { value: "SUBORDER", label: "Suborder" },
      { value: "FAMILY", label: "Family" },
      { value: "GENUS", label: "Genus" },
      { value: "SPECIES", label: "Species" },
      { value: "SUBSPECIES", label: "Subspecies" },
      { value: "VARIETY", label: "Variety" },
      { value: "SUBVARIETY", label: "Subvariety" },
      { value: "FORM", label: "Form" },
    ],
  },
  {
    fieldType: "SelectList",
    name: "occurrenceStatus",
    label: "Occurrence status",
    multi: false,
    options: [
      { value: "PRESENT", label: "Present" },
      { value: "EXTINCT", label: "Extinct" },
      { value: "EXCLUDED", label: "Excluded" },
      { value: "DOUBTFUL", label: "Doubtful" },
    ],
    defaultValue: "PRESENT"
  },
  {
    fieldType: "CheckboxInput",
    name: "endemic",
    label: "endemic",
  },
  {
    fieldType: "SelectList",
    name: "establishmentMeans",
    label: "Origin",
    multi: false,
    options: [
      { value: "NATIVE", label: "Native" },
      { value: "INTRODUCED", label: "Introduced" },
      { value: "UNCERTAIN", label: "Uncertain" },
    ],
    defaultValue: "NATIVE"
  },
  {
    fieldType: "CheckboxInput",
    name: "hasIntroducedOccurrences",
    label: "has introduced occurrences",
  },
  {
    fieldType: "SelectList",
    name: "degreeOfEstablishment",
    label: "Degree of establishment",
    multi: false,
    options: [
      { value: "NATIVE", label: "Native" },
      { value: "CULTIVATED", label: "Cultivated" },
      { value: "CASUAL", label: "Casual" },
      { value: "ADVENTIVE", label: "Adventive"},
      { value: "NATURALISED", label: "Naturalised" },
      { value: "COLONISING", label: "Colonising" },
      { value: "UNCERTAIN", label: "Uncertain" },
    ],
    defaultValue: "NATIVE"
  },
  {
    fieldType: "SelectList",
    name: "publicationStatus",
    label: "Publication status",
    options: [
      { value: "DRAFT", label: "draft" },
      { value: "PUBLISHED", label: "published" },
    ],
  },

]
