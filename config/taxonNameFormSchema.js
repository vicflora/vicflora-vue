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

const taxonNameAutocompleteQuery = gql`query($q: String!) {
  suggestions: taxonNameAutocomplete(q: $q) {
    id
    fullName
    authorship
  }
}`

const taxonNameAutocompleteSerializer = (name) => {
  return name.authorship ? name.fullName + ' ' + name.authorship : name.fullName
}

export default [
  {
    fieldType: "SelectList",
    name: "nameType",
    label: "Name type",
    multi: false,
    options: [
      { value: "SCIENTIFIC", label: "scientific"},
      { value: "INFORMAL", label: "informal"},
      { value: "HYBRID_NAME", label: "hybrid name"},
      { value: "HYBRID_FORMULA", label: "hybrid formula"},
      { value: "CULTIVAR", label: "cultivar"},
    ],
  },
  {
    fieldType: "SelectList",
    name: "rank",
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
      { value: "SECTION", label: "Section" }, 
      { value: "SPECIES", label: "Species" }, 
      { value: "SUBSPECIES", label: "Subspecies" }, 
      { value: "VARIETY", label: "Variety" }, 
      { value: "SUBVARIETY", label: "Subvariety" }, 
      { value: "FORM", label: "Form" }, 
    ],
  },
  {
    "fieldType": "AutocompleteControl",
    "name": "parent",
    "label": "Parent",
    "autocomplete": {
      "query": taxonNameAutocompleteQuery,
      "serializer": taxonNameAutocompleteSerializer,
    }
  },
  {
    "fieldType": "TextInput",
    "name": "namePart",
    "label": "Name part",
  },
  {
    fieldType: "TextInput",
    name: "fullName",
    label: "Full name",
    disabled: true,
  },
  {
    fieldType: "TextInput",
    name: "authorship",
    label: "Authors",
  },
  {
    fieldType: "TextInputSubform",
    name: "protologue",
    label: "Protologue",
    subform: "TaxonNameProtologueForm",
    serializerField: "referenceString"
  },
  {
    fieldType:"TextInput",
    name: "nomenclaturalNote",
    label: "Nomenclatural note",
  },
  {
    fieldType:"TextareaControl",
    name: "remarks",
    label: "Comments",
    rows: 3,
  },

]