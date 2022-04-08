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

export default [
  {
    fieldType: "TaxonNameAutocompleteButtonsInput",
    name: "taxonName",
    label: "Taxon name",
    placeholder: "Start typing taxon name..."
  },
  {
    fieldType: "TaxonConceptAutocompleteInput",
    name: "parent",
    label: "Parent",
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
      { value: "SECTION", label: "Section" }, 
      { value: "SPECIES", label: "Species" }, 
      { value: "SUBSPECIES", label: "Subspecies" }, 
      { value: "VARIETY", label: "Variety" }, 
      { value: "SUBVARIETY", label: "Subvariety" }, 
      { value: "FORM", label: "Form" }, 
    ],
  },
  {
    fieldType: "SelectList",
    name: "taxonomicStatus",
    label: "Taxonomic status",
    multi: false,
    options: [
      { value: "ACCEPTED", label: "Accepted" }, 
      { value: "SYNONYM", label: "Synonym" }, 
      { value: "HOMOTYPIC_SYNONYM", label: "Homotypic synonym" }, 
      { value: "HETEROTYPIC_SYNONYM", label: "Heterotypic synonym" }, 
      { value: "MISAPPLICATION", label: "Misapplication" }, 
      { value: "NOT_ACCEPTED", label: "Not accepted" }, 
    ],
  },
  {
    fieldType: "TaxonConceptAutocompleteInput",
    name: "acceptedConcept",
    label: "Accepted name",
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
      { value: "REPRODUCING", label: "Reproducing" }, 
      { value: "ESTABLISHED", label: "Established" }, 
      { value: "COLONISING", label: "Colonising" }, 
    ],
  },

]