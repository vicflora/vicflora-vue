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

const AgentAutocompleteQuery = gql`query ($q: String!) {
  suggestions: agentAutocomplete(q: $q) {
    id
    agentType
    name
  }
}`

const agentSuggestionSerializer = (agent) => {
  return agent.name
}

const JournalAutocompleteQuery = gql`query ($q: String!) {
  suggestions: journalAutocomplete(q: $q) {
    id
    referenceString
  }
}`

const JournalSuggestionSerializer = (journal) => {
  return journal.referenceString
}

const BookAutocompleteQuery = gql`query ($q: String!) {
  suggestions: bookAutocomplete(q: $q) {
    id
    referenceStringHtml
  }
}`

const BookSuggestionSerializer = (reference) => {
  return reference.author.name + ' ' + reference.publicationYear
}

export default [
  {
    fieldType: "SelectList",
    name: "referenceType",
    multi: false,
    label: "Type",
    options: [
      { value: 'ARTICLE', label: 'Article' },
      { value: 'AUDIO_VISUAL_DOCUMENT', label: 'Audio-visual Document' },
      { value: 'BOOK', label: 'Book' },
      { value: 'CHAPTER', label: 'Chapter' },
      { value: 'JOURNAL', label: 'Journal' },
      { value: 'MULTI_VOLUME_BOOK', label: 'Multivolume Book' },
      { value: 'PERIODICAL', label: 'Periodical' },
      { value: 'REPORT', label: 'Report' },
      { value: 'SERIES', label: 'Series' },
      { value: 'SOFTWARE_APPLICATION', label: 'Software application' },
      { value: 'WEBPAGE', label: 'Webpage' },
      { value: 'WEBSITE', label: 'Website' },
    ]
  },
  {
    fieldType: "AutocompleteControl",
    name: "author",
    label: "Author(s)",
    autocomplete: {
      query: AgentAutocompleteQuery,
      serializer: agentSuggestionSerializer,
    },
    buttons: ["create"],
    form: "AgentForm"
  },
  {
    fieldType: "TextInput",
    name: "publicationYear",
    label: "Publication year"
  },
  {
    fieldType: "TextareaControl",
    label: "Title",
    name: "title",
    rows: 2,
  },
  {
    fieldType: "AutocompleteControl",
    label: "Journal",
    name: "journal",
    autocomplete: {
      query: JournalAutocompleteQuery,
      serializer: JournalSuggestionSerializer,
    },
    buttons: ['update', 'create'],
    form: 'ReferenceForm',
    subtype: 'Journal'
  },
  {
    fieldType: "AutocompleteControl",
    label: "In",
    name: "book",
    autocomplete: {
      query: BookAutocompleteQuery,
      serializer: BookSuggestionSerializer,
      showSelected: true,
      suggestionField: 'referenceStringHtml'
    },
    buttons: ['update', 'create'],
    form: 'ReferenceForm',
    subtype: 'Book'
  },
  {
    fieldType: 'TextInput',
    name: "publisher",
    label: 'Publisher'
  },
  {
    fieldType: 'TextInput',
    name: "placeOfPublication",
    label: 'Place of publication'
  },
  {
    fieldType: 'TextInput',
    name: "volume",
    label: 'Volume',
    controlWidth: 'col-md-4'
  },
  {
    fieldType: 'NumberInput',
    name: "issue",
    label: 'Issue',
    controlWidth: 'col-md-4'
  },
  {
    fieldType: 'NumberInput',
    name: "number",
    label: 'Number',
    controlWidth: 'col-md-4'
  },
  {
    fieldType: "NumberInput",
    name: "pageStart",
    label: "Page start",
    minValue: 0,
    controlWidth: 'col-md-2'
  },
  {
    fieldType: "NumberInput",
    name: "pageEnd",
    label: "Page end",
    minValue: 0,
    controlWidth: 'col-md-2'
  },
  {
    fieldType: 'TextInput',
    name: "pages",
    label: 'Pages',
    controlWidth: 'col-md-4'
  },
  {
    fieldType: 'NumberInput',
    name: "numberOfPages",
    label: 'Number of pages',
    controlWidth: 'col-md-4'
  },
  {
    fieldType: 'TextInput',
    name: "isbn",
    label: 'ISBN',
    controlWidth: 'col-md-4'
  },
  {
    fieldType: 'TextInput',
    name: "issn",
    label: 'ISSN',
    controlWidth: 'col-md-4'
  },
  {
    fieldType: 'TextInput',
    name: "doi",
    label: 'DOI',
    controlWidth: 'col-md-4'
  },
]
