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

const referenceAutocompleteQuery = gql`query ReferenceAutocompleteQuery($q: String!) {
  suggestions: referenceAutocomplete(q: $q) {
    id
    quickRef
    author {
      name
    }
    publicationYear
    citationHtml
  }
}`

const referenceAutocompleteSerializer = (reference) => {
  return reference.author.name + ' ' + reference.publicationYear
}

const TaxonConceptAutoCompleteQuery = gql`query taxonConceptAutocomplete($q: String!) {
  suggestions: taxonConceptAutocomplete(q: $q) {
    id
    taxonName {
      fullName
      authorship
    }
  }
}`

const taxonConceptSuggestionSerializer =  (concept) => {
  return concept.taxonName.authorship 
      ? concept.taxonName.fullName + ' ' + concept.taxonName.authorship 
      : concept.taxonName.fullName
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
    }
  },
  {
    fieldType: "AutocompleteControl",
    name: "source",
    label: "Source",
    autocomplete: {
      query: referenceAutocompleteQuery,
      serializer: referenceAutocompleteSerializer,
      showSelected: true,
      suggestionField: "citationHtml"
    },
    disabled: true,
  },
]