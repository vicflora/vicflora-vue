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
import ReferenceAutocompleteQuery from '@/graphql/queries/ReferenceAutocompleteQuery'

const referenceAutocompleteSerializer = (reference) => {
  return reference.author.name + ' ' + reference.publicationYear
}

const taxonConceptSuggestionSerializer =  (concept) => {
  if (concept.taxonName) {
    return concept.taxonName.authorship
        ? concept.taxonName.fullName + ' ' + concept.taxonName.authorship
        : concept.taxonName.fullName
  }
}

export default [
  {
    fieldType: "ProfileCKEditorControl",
    name: "profile",
    label: "Profile",
  },
  {
    fieldType: "AutocompleteControl",
    name: "acceptedConcept",
    label: "Assign to taxon",
    autocomplete: {
      query: TaxonConceptAutoCompleteQuery,
      serializer: taxonConceptSuggestionSerializer,
    },
    hide: true,
  },
  {
    fieldType: "AutocompleteControl",
    name: "source",
    label: "Source",
    autocomplete: {
      query: ReferenceAutocompleteQuery,
      serializer: referenceAutocompleteSerializer,
      showSelected: true,
      suggestionField: "referenceStringHtml"
    },
    disabled: true,
  },
]
