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

import TaxonName from "@/models/TaxonNameModel"

export default class TaxonConcept {

  constructor(data = {}) {
    this.id = data.id
    this.taxonRank = data.taxonRank
    this.taxonomicStatus = data.taxonomicStatus
    this.occurrenceStatus = data.occurrenceStatus
    this.establishmentMeans = data.establishmentMeans
    this.degreeOfEstablishment = data.degreeOfEstablishment

    this.taxonName = new TaxonName(data.taxonName || {})
    this.parent = data.parent ? new TaxonConcept(data.parent) : null
    this.acceptedConcept = data.acceptedConcept ? new TaxonConcept(data.acceptedConcept) : null
  }
}