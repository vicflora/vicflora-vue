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

import { TaxonName } from "@/models/TaxonNameModel"
import { Reference } from "@/models/ReferenceModel"

export class TaxonConcept {

  constructor(data = {}) {
    this.id = data.id
    this.taxonRank = data.taxonRank
    this.taxonomicStatus = data.taxonomicStatus
    this.occurrenceStatus = data.occurrenceStatus
    this.endemic = data.endemic
    this.establishmentMeans = data.establishmentMeans
    this.hasIntroducedOccurrences = data.hasIntroducedOccurrences
    this.degreeOfEstablishment = data.degreeOfEstablishment
    this.remarks = this.remarks

    this.taxonName = new TaxonName(data.taxonName || {})
    this.accordingTo = data.accordingTo ? new Reference(data.accordingTo) : null
    this.parent = data.parent ? new TaxonConcept(data.parent) : null
    this.acceptedConcept = data.acceptedConcept ? new TaxonConcept(data.acceptedConcept) : null
  }
}

export class UpdateTaxonConceptInput {
  constructor(data = {}) {
    this.id = data.id
    this.taxonRank = data.taxonRank
    this.taxonomicStatus = data.taxonomicStatus
    this.occurrenceStatus = data.occurrenceStatus
    this.endemic = data.endemic
    this.establishmentMeans = data.establishmentMeans
    this.hasIntroducedOccurrences = data.hasIntroducedOccurrences
    this.degreeOfEstablishment = data.degreeOfEstablishment
    this.remarks = this.remarks

    this.taxonName = {
      connect: data.taxonName.id
    }

    if (data.accordingTo) {
      this.accordingTo = {
        connect: data.accordingTo.id
      }
    }
    if (data.parent) {
      this.parent = {
        connect: data.parent.id
      }
    }

    if (data.acceptedConcept) {
      this.acceptedConcept = {
        connect: data.acceptedConcept.id
      }
    }
  }
}

export class CreateTaxonConceptInput {
  constructor(data = {}) {
    this.taxonRank = data.taxonRank
    this.taxonomicStatus = data.taxonomicStatus
    this.occurrenceStatus = data.occurrenceStatus
    this.endemic = data.endemic
    this.establishmentMeans = data.establishmentMeans
    this.hasIntroducedOccurrences = data.hasIntroducedOccurrences
    this.degreeOfEstablishment = data.degreeOfEstablishment
    this.remarks = this.remarks

    this.taxonName = {
      connect: data.taxonName.id
    }

    if (data.accordingTo) {
      this.accordingTo = {
        connect: data.accordingTo.id
      }
    }
    if (data.parent) {
      this.parent = {
        connect: data.parent.id
      }
    }

    if (data.acceptedConcept) {
      this.acceptedConcept = {
        connect: data.acceptedConcept.id
      }
    }
  }
}